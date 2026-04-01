import { useState, useEffect, useRef } from 'react';
import { FiUpload, FiCamera, FiX } from "react-icons/fi";

interface DocumentsProps {
  onNext: () => void;
  onBack: () => void;
}

interface UploadedFile {
  file: File;
  preview?: string;
  name: string;
  size: number;
  type: string;
}

interface DocumentUpload {
  id: string;
  required: boolean;
  title: string;
  description: string;
  uploadText: string;
  multiple?: boolean;
  uploadedFiles?: UploadedFile[];
  uploadedFile?: UploadedFile;
}

interface StoredFileData {
  name: string;
  size: number;
  type: string;
  preview?: string;
  dataUrl: string;
}

type StoredData = Record<string, StoredFileData | StoredFileData[]>;

function Documents({ onNext, onBack }: DocumentsProps) {
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      id: 'government-id',
      required: true,
      title: 'Government-Issued ID',
      description: 'Upload a clear photo of your National ID, Driver\'s License, or International Passport',
      uploadText: 'Click to upload ID',
      multiple: false,
    },
    {
      id: 'passport-photo',
      required: true,
      title: 'Passport Photo',
      description: 'Upload a clear passport photo',
      uploadText: 'Click to upload passport',
      multiple: false,
    },
    {
      id: 'certifications',
      required: false,
      title: 'Professional Certifications',
      description: 'Upload any relevant trade certifications, training certificates, or licenses (JPG/JPEG/PNG)',
      uploadText: 'Add certification',
      multiple: true,
      uploadedFiles: [],
    },
    {
      id: 'work-samples',
      required: false,
      title: 'Work Samples',
      description: 'Upload photos of your previous work to showcase your skills (JPG/JPEG/PNG)',
      uploadText: 'Add sample',
      multiple: true,
      uploadedFiles: [],
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());


  useEffect(() => {
    const loadSavedFiles = async () => {
      const savedFiles = sessionStorage.getItem('uploadedDocuments');
      if (savedFiles) {
        try {
          const parsed = JSON.parse(savedFiles) as StoredData;

          for (const [docId, fileData] of Object.entries(parsed)) {
            const doc = documents.find(d => d.id === docId);
            if (!doc) continue;

            if (doc.multiple) {
              if (Array.isArray(fileData)) {
                const loadedFiles: UploadedFile[] = [];
                for (const item of fileData) {
                  if (item.dataUrl) {
                    const response = await fetch(item.dataUrl);
                    const blob = await response.blob();
                    const file = new File([blob], item.name, { type: item.type });
                    let preview = item.preview;
                    if (file.type.startsWith('image/') && !preview) {
                      preview = URL.createObjectURL(file);
                    }
                    loadedFiles.push({
                      file,
                      preview,
                      name: item.name,
                      size: item.size,
                      type: item.type,
                    });
                  }
                }
                setDocuments(prev =>
                  prev.map(d =>
                    d.id === docId ? { ...d, uploadedFiles: loadedFiles } : d
                  )
                );
              }
            } else {
              if (!Array.isArray(fileData) && fileData.dataUrl) {
                const response = await fetch(fileData.dataUrl);
                const blob = await response.blob();
                const file = new File([blob], fileData.name, { type: fileData.type });
                let preview = fileData.preview;
                if (file.type.startsWith('image/') && !preview) {
                  preview = URL.createObjectURL(file);
                }
                const uploadedFile: UploadedFile = {
                  file,
                  preview,
                  name: fileData.name,
                  size: fileData.size,
                  type: fileData.type,
                };
                setDocuments(prev =>
                  prev.map(d =>
                    d.id === docId ? { ...d, uploadedFile } : d
                  )
                );
              }
            }
          }
        } catch (error) {
          console.error('Error loading saved files:', error);
        }
      }
    };

    loadSavedFiles();
  }, []);

  
  useEffect(() => {
    const saveFilesToStorage = async () => {
      const filesToSave: StoredData = {};

      for (const doc of documents) {
        if (doc.multiple && doc.uploadedFiles && doc.uploadedFiles.length > 0) {
          const fileArray: StoredFileData[] = [];
          for (const f of doc.uploadedFiles) {
            const dataUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(f.file);
            });
            fileArray.push({
              name: f.name,
              size: f.size,
              type: f.type,
              preview: f.preview,
              dataUrl,
            });
          }
          filesToSave[doc.id] = fileArray;
        } else if (!doc.multiple && doc.uploadedFile) {
          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(doc.uploadedFile.file);
          });
          filesToSave[doc.id] = {
            name: doc.uploadedFile.name,
            size: doc.uploadedFile.size,
            type: doc.uploadedFile.type,
            preview: doc.uploadedFile.preview,
            dataUrl,
          };
        }
      }

      sessionStorage.setItem('uploadedDocuments', JSON.stringify(filesToSave));
    };

    saveFilesToStorage();
  }, [documents]);

  const isValidImageFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  const handleFileUpload = (documentId: string, files: FileList | null) => {
    if (!files) return;

    const doc = documents.find(d => d.id === documentId);
    if (!doc) return;

  
    const invalidFiles = Array.from(files).filter(f => !isValidImageFile(f));
    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        [documentId]: `Only JPEG and PNG images are allowed.`,
      }));
      return;
    }

    if (doc.multiple) {
      
      const newFiles: UploadedFile[] = Array.from(files).map(file => {
        let preview: string | undefined;
        if (file.type.startsWith('image/')) {
          preview = URL.createObjectURL(file);
        }
        return {
          file,
          preview,
          name: file.name,
          size: file.size,
          type: file.type,
        };
      });

      setDocuments(prev =>
        prev.map(d =>
          d.id === documentId
            ? { ...d, uploadedFiles: [...(d.uploadedFiles || []), ...newFiles] }
            : d
        )
      );
    } else {
    
      const file = files[0];
      if (!file) return;

      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      const uploadedFile: UploadedFile = {
        file,
        preview,
        name: file.name,
        size: file.size,
        type: file.type,
      };

      setDocuments(prev =>
        prev.map(d =>
          d.id === documentId ? { ...d, uploadedFile } : d
        )
      );
    }

    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[documentId];
      return newErrors;
    });
  };

  const removeSingleFile = (documentId: string) => {
    setDocuments(prev =>
      prev.map(doc => {
        if (doc.id === documentId) {
          if (doc.uploadedFile?.preview) {
            URL.revokeObjectURL(doc.uploadedFile.preview);
          }
          return { ...doc, uploadedFile: undefined };
        }
        return doc;
      })
    );
    setTouched(prev => ({ ...prev, [documentId]: true }));
  };

  const removeMultipleFile = (documentId: string, index: number) => {
    setDocuments(prev =>
      prev.map(doc => {
        if (doc.id === documentId && doc.uploadedFiles) {
          const fileToRemove = doc.uploadedFiles[index];
          if (fileToRemove?.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
          }
          const newFiles = [...doc.uploadedFiles];
          newFiles.splice(index, 1);
          return { ...doc, uploadedFiles: newFiles };
        }
        return doc;
      })
    );
    setTouched(prev => ({ ...prev, [documentId]: true }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = () => {
    const newTouched: Record<string, boolean> = {};
    documents.forEach(doc => {
      if (doc.required) {
        newTouched[doc.id] = true;
      }
    });
    setTouched(newTouched);

    const missingRequired = documents.filter(doc => {
      if (!doc.required) return false;
      if (doc.multiple) {
        return !(doc.uploadedFiles && doc.uploadedFiles.length > 0);
      } else {
        return !doc.uploadedFile;
      }
    });

    if (missingRequired.length > 0) {
      const newErrors: Record<string, string> = {};
      missingRequired.forEach(doc => {
        newErrors[doc.id] = `${doc.title} is required`;
      });
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  const handleBack = () => {
    onBack();
  };

  const isWorkSamples = (docId: string) => docId === 'work-samples';
  const isMultipleAllowed = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    return doc?.multiple === true;
  };

  const getIcon = (docId: string) => {
    switch (docId) {
      case 'government-id':
        return <FiUpload className={`mx-auto ${isWorkSamples(docId) ? 'h-5 w-5' : 'h-8 w-8'} text-gray-400 group-hover:text-gray-600 transition-colors`} />;
      case 'passport-photo':
        return <FiCamera className={`mx-auto ${isWorkSamples(docId) ? 'h-5 w-5' : 'h-8 w-8'} text-gray-400 group-hover:text-gray-600 transition-colors`} />;
      default:
        return <FiUpload className={`mx-auto ${isWorkSamples(docId) ? 'h-5 w-5' : 'h-8 w-8'} text-gray-400 group-hover:text-gray-600 transition-colors`} />;
    }
  };

  const showError = (docId: string) => {
    return touched[docId] && errors[docId];
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Upload Documents</h2>
      </div>

      <div className="space-y-8">
        {documents.map((doc) => (
          <div key={doc.id} className="pb-6 last:pb-0">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-medium text-gray-900">
                  {doc.title}
                  {doc.required && <span className="text-red-500 ml-1">*</span>}
                </p>
                {!doc.required && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Optional
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">{doc.description}</p>
            </div>

            {doc.multiple ? (
              <>
                {doc.uploadedFiles && doc.uploadedFiles.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {doc.uploadedFiles.map((file, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          {file.preview ? (
                            <img src={file.preview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <FiUpload className="w-6 h-6 text-gray-600" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMultipleFile(doc.id, idx)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove file"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="relative">
                  <input
                    type="file"
                    id={doc.id}
                    multiple
                    accept="image/jpeg,image/png"
                    className="hidden"
                    ref={(el) => {
                      if (el) fileInputRefs.current.set(doc.id, el);
                    }}
                    onChange={(e) => {
                      const files = e.target.files;
                      handleFileUpload(doc.id, files);
                     
                      if (fileInputRefs.current.get(doc.id)) {
                        fileInputRefs.current.get(doc.id)!.value = '';
                      }
                      setTouched(prev => ({ ...prev, [doc.id]: true }));
                    }}
                  />
                  <label
                    htmlFor={doc.id}
                    className={`flex items-center justify-center border-2 border-dashed rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer group ${
                      isWorkSamples(doc.id)
                        ? 'w-56 h-56 px-3 py-3'
                        : 'w-full h-30 px-4 py-6'
                    } ${
                      showError(doc.id)
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      {getIcon(doc.id)}
                      <p className={`mt-1 text-sm text-gray-600 group-hover:text-gray-800 transition-colors ${
                        isWorkSamples(doc.id) ? 'text-xs' : ''
                      }`}>
                        {doc.uploadText}
                      </p>
                    </div>
                  </label>
                </div>
              </>
            ) : (
              <>
                {doc.uploadedFile ? (
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      {doc.uploadedFile.preview ? (
                        <img src={doc.uploadedFile.preview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FiUpload className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(doc.uploadedFile.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSingleFile(doc.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      id={doc.id}
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={(e) => {
                        handleFileUpload(doc.id, e.target.files);
                        setTouched(prev => ({ ...prev, [doc.id]: true }));
                      }}
                    />
                    <label
                      htmlFor={doc.id}
                      className={`flex items-center justify-center border-2 border-dashed rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer group ${
                        isWorkSamples(doc.id)
                          ? 'w-56 h-56 px-3 py-3'
                          : 'w-full h-30 px-4 py-6'
                      } ${
                        showError(doc.id)
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        {getIcon(doc.id)}
                        <p className={`mt-1 text-sm text-gray-600 group-hover:text-gray-800 transition-colors ${
                          isWorkSamples(doc.id) ? 'text-xs' : ''
                        }`}>
                          {doc.uploadText}
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </>
            )}

            {showError(doc.id) && (
              <p className="mt-2 text-sm text-red-500">{errors[doc.id]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-700 hover:bg-brandOrange py-2 px-6 rounded-lg font-medium border border-gray-300 hover:text-white transition-all duration-300 text-sm"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-brandText text-white py-2 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-[1.02] text-sm"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Documents;