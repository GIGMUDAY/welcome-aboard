import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, Sun, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const workingWindows = [
  { value: "morning", label: "Morning", icon: "🌅", description: "6 AM - 12 PM" },
  { value: "afternoon", label: "Afternoon", icon: "☀️", description: "12 PM - 6 PM" },
  { value: "evening", label: "Evening", icon: "🌙", description: "6 PM - 12 AM" },
  { value: "flexible", label: "Flexible", icon: "🔄", description: "Any time" },
];

const careerPaths = [
  { 
    value: "contributor", 
    label: "Contributor", 
    description: "Focus on hands-on technical work and deliverables",
    icon: "🔧"
  },
  { 
    value: "reviewer-track", 
    label: "Reviewer Track", 
    description: "Quality assurance and technical review focus",
    icon: "🔍"
  },
  { 
    value: "pm-track", 
    label: "PM Track", 
    description: "Project management and team coordination",
    icon: "📊"
  },
];

export const AvailabilityStep = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Availability & Goals</h2>
        <p className="text-muted-foreground">Help us understand your schedule and career aspirations</p>
      </div>

      {/* Hours per Week */}
      <div className="space-y-4">
        <Label htmlFor="hoursPerWeek" className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4 text-primary" />
          Hours/Week You Can Commit *
        </Label>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center gap-4">
            <Input
              id="hoursPerWeek"
              type="number"
              min={1}
              max={60}
              value={formData.hoursPerWeek}
              onChange={(e) => updateFormData({ hoursPerWeek: parseInt(e.target.value) || 0 })}
              className="h-14 text-2xl font-display font-bold text-center w-24 bg-background border-border focus:border-primary"
            />
            <span className="text-muted-foreground">hours per week</span>
          </div>
        </div>
      </div>

      {/* Working Window */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Sun className="w-4 h-4 text-primary" />
          Preferred Working Window *
        </Label>
        <RadioGroup
          value={formData.workingWindow}
          onValueChange={(value) => updateFormData({ workingWindow: value })}
          className="grid grid-cols-2 gap-3"
        >
          {workingWindows.map((window) => (
            <label
              key={window.value}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200",
                formData.workingWindow === window.value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <RadioGroupItem value={window.value} className="sr-only" />
              <span className="text-2xl">{window.icon}</span>
              <div>
                <span className="text-sm font-medium block">{window.label}</span>
                <span className="text-xs text-muted-foreground">{window.description}</span>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Career Path */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Compass className="w-4 h-4 text-primary" />
          Choose Your Path *
        </Label>
        <RadioGroup
          value={formData.careerPath}
          onValueChange={(value) => updateFormData({ careerPath: value })}
          className="space-y-3"
        >
          {careerPaths.map((path) => (
            <label
              key={path.value}
              className={cn(
                "flex items-start gap-4 p-5 rounded-lg border cursor-pointer transition-all duration-200",
                formData.careerPath === path.value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <RadioGroupItem value={path.value} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{path.icon}</span>
                  <span className="font-medium">{path.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{path.description}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
