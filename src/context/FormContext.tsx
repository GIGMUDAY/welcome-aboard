import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingFormData, ApplicationStatus } from '@/types/form';

interface FormContextType {
  formData: OnboardingFormData;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  applicationStatus: ApplicationStatus;
  setApplicationStatus: (status: ApplicationStatus) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
  resetForm: () => void;
}

const initialFormData: OnboardingFormData = {
  fullName: '',
  email: '',
  countryCode: '+1',
  phoneNumber: '',
  country: '',
  city: '',
  timezone: '',
  disciplines: [],
  tools: [],
  yearsExperience: 0,
  portfolioLinks: '',
  hoursPerWeek: 10,
  workingWindow: '',
  careerPath: '',
  referredBy: '',
  file: null,
  codeOfConduct: false,
  confidentiality: false,
  originality: false,
  dataHandling: false,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>('draft');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setApplicationStatus('draft');
    setIsSubmitted(false);
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      applicationStatus,
      setApplicationStatus,
      isSubmitted,
      setIsSubmitted,
      resetForm,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
