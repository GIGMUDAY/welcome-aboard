import { StatusTracker } from "@/components/StatusTracker";
import { useFormContext } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RefreshCw, MessageCircle } from "lucide-react";

export const SuccessScreen = () => {
  const { applicationStatus, resetForm } = useFormContext();

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Success Message */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow animate-scale-in">
          <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          Application Submitted!
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for applying. We'll review your application and get back to you soon.
        </p>
      </div>

      {/* Status Tracker */}
      <StatusTracker status={applicationStatus} />

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={resetForm}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Start New Application
        </Button>
        <Button
          className="gradient-primary text-primary-foreground flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </Button>
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-card rounded-xl p-6 border border-border">
        <h3 className="font-display font-semibold text-foreground mb-3">What happens next?</h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">1</span>
            <span>Our team will review your application within 2-3 business days</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">2</span>
            <span>You'll receive an email notification about your application status</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">3</span>
            <span>If approved, you'll get access to onboarding materials and team introductions</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
