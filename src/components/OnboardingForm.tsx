import { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { FormNavigation } from "@/components/FormNavigation";
import { PersonalInfoStep } from "@/components/steps/PersonalInfoStep";
import { ProfessionalStep } from "@/components/steps/ProfessionalStep";
import { AvailabilityStep } from "@/components/steps/AvailabilityStep";
import { FinalDetailsStep } from "@/components/steps/FinalDetailsStep";
import { toast } from "sonner";

const TOTAL_STEPS = 4;
const stepLabels = ["Personal", "Professional", "Availability", "Submit"];

export const OnboardingForm = () => {
  const { formData, currentStep, setCurrentStep, setApplicationStatus, setIsSubmitted } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          toast.error("Please enter your full name");
          return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        if (!formData.phoneNumber.trim()) {
          toast.error("Please enter your phone number");
          return false;
        }
        if (!formData.country) {
          toast.error("Please select your country");
          return false;
        }
        if (!formData.city.trim()) {
          toast.error("Please enter your city");
          return false;
        }
        if (!formData.timezone) {
          toast.error("Please select your timezone");
          return false;
        }
        return true;
      case 2:
        if (formData.disciplines.length === 0) {
          toast.error("Please select at least one discipline");
          return false;
        }
        if (formData.tools.length === 0) {
          toast.error("Please select at least one tool");
          return false;
        }
        return true;
      case 3:
        if (!formData.hoursPerWeek || formData.hoursPerWeek < 1) {
          toast.error("Please enter valid hours per week");
          return false;
        }
        if (!formData.workingWindow) {
          toast.error("Please select your preferred working window");
          return false;
        }
        if (!formData.careerPath) {
          toast.error("Please select your career path");
          return false;
        }
        return true;
      case 4:
        if (!formData.codeOfConduct || !formData.confidentiality || 
            !formData.originality || !formData.dataHandling) {
          toast.error("Please accept all required confirmations");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, TOTAL_STEPS));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setApplicationStatus("pending");
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    toast.success("Application submitted successfully!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <ProfessionalStep />;
      case 3:
        return <AvailabilityStep />;
      case 4:
        return <FinalDetailsStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressSteps 
        currentStep={currentStep} 
        totalSteps={TOTAL_STEPS} 
        labels={stepLabels}
      />
      
      <div className="mt-6 bg-card rounded-xl p-6 shadow-md border border-border">
        {renderStep()}
        
        <FormNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
