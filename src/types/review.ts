
export interface ReviewData {
  personalInfo: {
    fullLegalName: string;
    phoneNumber: string;
    residentialAddress: string;
    nin: string;
    serviceType: string;
    otherService: string;
    aboutYou: string;
  };
  documents: {
    governmentId: { name: string; uploaded: boolean };
    selfieId: { name: string; uploaded: boolean };
    certifications: { name: string; uploaded: boolean; count: number };
    workSamples: { name: string; uploaded: boolean; count: number };
  };
}