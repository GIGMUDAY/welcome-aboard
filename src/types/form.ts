export interface OnboardingFormData {
  // Personal Info
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
  city: string;
  timezone: string;
  
  // Professional Background
  disciplines: string[];
  tools: string[];
  yearsExperience: number;
  portfolioLinks: string;
  
  // Availability
  hoursPerWeek: number;
  workingWindow: string;
  careerPath: string;
  
  // Final Details
  referredBy: string;
  file: File | null;
  
  // Confirmations
  codeOfConduct: boolean;
  confidentiality: boolean;
  originality: boolean;
  dataHandling: boolean;
}

export type ApplicationStatus = 'draft' | 'pending' | 'under_review' | 'approved' | 'rejected';

export interface ApplicationData {
  id: string;
  formData: OnboardingFormData;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
}
