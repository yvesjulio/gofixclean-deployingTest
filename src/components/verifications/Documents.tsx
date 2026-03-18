import { useState, useEffect } from 'react';
import { FiUpload, FiCamera } from "react-icons/fi";

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
  uploadedFile?: UploadedFile;
}

interface StoredFileData {
  name: string;
  size: number;
  type: string;
  preview?: string;
  dataUrl: string;
}

function Documents({ onNext, onBack }: DocumentsProps) {
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      id: 'government-id',
      required: true,
      title: 'Government-Issued ID',
      description: 'Upload a clear photo of your National ID, Driver\'s License, or International Passport',
      uploadText: 'Click to upload ID'
    },
    {
      id: 'selfie-id',
      required: true,
      title: 'Selfie with ID',
      description: 'Take a clear photo of yourself holding your ID document',
      uploadText: 'Click to upload selfie'
    },
    {
      id: 'certifications',
      required: false,
      title: 'Professional Certifications',
      description: 'Upload any relevant trade certifications, training certificates, or licenses',
      uploadText: 'Add certification'
    },
    {
      id: 'work-samples',
      required: false,
      title: 'Work Samples',
      description: 'Upload photos or videos of your previous work to showcase your skills',
      uploadText: 'Add'
    }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

 
  useEffect(() => {
    const loadSavedFiles = async () => {
      const savedFiles = sessionStorage.getItem('uploadedDocuments');
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles) as Record<string, StoredFileData>;
          
         
          for (const [docId, fileData] of Object.entries(parsedFiles)) {
            if (fileData.dataUrl) {
             
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
                type: fileData.type
              };
              
              setDocuments(prev =>
                prev.map(doc =>
                  doc.id === docId
                    ? { ...doc, uploadedFile }
                    : doc
                )
              );
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
      const filesToSave: Record<string, StoredFileData> = {};
      
      for (const doc of documents) {
        if (doc.uploadedFile) {
         
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
            dataUrl
          };
        }
      }
      
      sessionStorage.setItem('uploadedDocuments', JSON.stringify(filesToSave));
    };

    saveFilesToStorage();
  }, [documents]);

  const handleFileUpload = (documentId: string, file: File) => {
    let preview: string | undefined;
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file);
    }

    const uploadedFile: UploadedFile = {
      file,
      preview,
      name: file.name,
      size: file.size,
      type: file.type
    };

    setDocuments(prev =>
      prev.map(doc =>
        doc.id === documentId
          ? { ...doc, uploadedFile }
          : doc
      )
    );

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[documentId];
      return newErrors;
    });
  };

  const removeFile = (documentId: string) => {
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

   
    const savedFiles = sessionStorage.getItem('uploadedDocuments');
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      delete parsedFiles[documentId];
      sessionStorage.setItem('uploadedDocuments', JSON.stringify(parsedFiles));
    }
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

    const missingRequired = documents.filter(doc => doc.required && !doc.uploadedFile);
    
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

  const getIcon = (docId: string) => {
    switch(docId) {
      case 'government-id':
        return <FiUpload className={`mx-auto ${isWorkSamples(docId) ? 'h-5 w-5' : 'h-8 w-8'} text-gray-400 group-hover:text-gray-600 transition-colors`} />;
      case 'selfie-id':
        return <FiCamera className={`mx-auto ${isWorkSamples(docId) ? 'h-5 w-5' : 'h-8 w-8'} text-gray-400 group-hover:text-gray-600 transition-colors`} />;
      case 'certifications':
        return <FiUpload className={`mx-auto ${isWorkSamples(docId) ? 'h-5 w-5' : 'h-8 w-8'} text-gray-400 group-hover:text-gray-600 transition-colors`} />;
      case 'work-samples':
        return <FiUpload className="mx-auto h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />;
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

            {doc.uploadedFile ? (
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {doc.uploadedFile.preview ? (
                    <img 
                      src={doc.uploadedFile.preview} 
                      alt="Preview" 
                      className="w-12 h-12 object-cover rounded-lg"
                    />
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
                  onClick={() => removeFile(doc.id)}
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
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(doc.id, file);
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