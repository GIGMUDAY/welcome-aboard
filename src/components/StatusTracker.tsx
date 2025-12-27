import { cn } from "@/lib/utils";
import { Check, Clock, Search, CheckCircle2, XCircle } from "lucide-react";
import { ApplicationStatus } from "@/types/form";

interface StatusTrackerProps {
  status: ApplicationStatus;
}

const statusSteps = [
  { key: "pending", label: "Submitted", icon: Clock },
  { key: "under_review", label: "Under Review", icon: Search },
  { key: "approved", label: "Approved", icon: CheckCircle2 },
];

export const StatusTracker = ({ status }: StatusTrackerProps) => {
  const getStatusIndex = () => {
    switch (status) {
      case "pending": return 0;
      case "under_review": return 1;
      case "approved": return 2;
      case "rejected": return -1;
      default: return -1;
    }
  };

  const currentIndex = getStatusIndex();
  const isRejected = status === "rejected";

  if (isRejected) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border shadow-md animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">
            Application Not Approved
          </h3>
          <p className="text-sm text-muted-foreground">
            Unfortunately, your application was not approved at this time. 
            Please contact support for more information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-md animate-fade-in">
      <h3 className="text-lg font-display font-bold text-foreground mb-6 text-center">
        Application Status
      </h3>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-accent transition-all duration-500"
          style={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
        />

        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                    isCompleted && "bg-accent text-accent-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-3 text-xs font-medium text-center",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current status message */}
      <div className="mt-6 p-4 rounded-lg bg-accent/20 text-center">
        <p className="text-sm text-foreground">
          {status === "pending" && "Your application has been received and is awaiting review."}
          {status === "under_review" && "Your application is currently being reviewed by our team."}
          {status === "approved" && "Congratulations! Your application has been approved."}
        </p>
      </div>
    </div>
  );
};
