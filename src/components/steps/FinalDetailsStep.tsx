import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Upload, Shield, FileCheck, Lock, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const MAX_FILE_SIZE = 19 * 1024 * 1024; // 19MB

export const FinalDetailsStep = () => {
  const { formData, updateFormData } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setFileError(null);
    
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size must be less than 19MB");
        return;
      }
      updateFormData({ file });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const confirmations = [
    {
      key: "codeOfConduct",
      label: "I agree to the Code of Conduct",
      icon: Shield,
      description: "I will maintain professional standards and respect",
    },
    {
      key: "confidentiality",
      label: "I agree to Confidentiality terms",
      icon: Lock,
      description: "I will protect sensitive project information",
    },
    {
      key: "originality",
      label: "I confirm Originality of my work",
      icon: FileCheck,
      description: "All submitted work will be my own original content",
    },
    {
      key: "dataHandling",
      label: "I consent to Data Handling",
      icon: Database,
      description: "I understand how my data will be stored and used",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Final Details</h2>
        <p className="text-muted-foreground">Almost there! Just a few more things</p>
      </div>

      {/* Referral */}
      <div className="space-y-2">
        <Label htmlFor="referredBy" className="flex items-center gap-2 text-sm font-medium">
          <UserPlus className="w-4 h-4 text-primary" />
          Referred by Someone?
        </Label>
        <Input
          id="referredBy"
          value={formData.referredBy}
          onChange={(e) => updateFormData({ referredBy: e.target.value })}
          placeholder="Enter name or type SKIP"
          className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
        />
        <p className="text-xs text-muted-foreground">
          Type "SKIP" if you weren't referred by anyone
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Upload className="w-4 h-4 text-primary" />
          Upload Resume/Portfolio
        </Label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
            dragActive 
              ? "border-primary bg-primary/10" 
              : "border-border bg-card hover:border-primary/50 hover:bg-accent/50",
            fileError && "border-destructive"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
            accept=".pdf,.doc,.docx,.zip"
          />
          
          {formData.file ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{formData.file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag & drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Max file size: 19MB (PDF, DOC, DOCX, ZIP)
              </p>
            </>
          )}
        </div>
        {fileError && (
          <p className="text-sm text-destructive">{fileError}</p>
        )}
      </div>

      {/* Confirmations */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Required Confirmations *</Label>
        <div className="space-y-3">
          {confirmations.map(({ key, label, icon: Icon, description }) => (
            <label
              key={key}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200",
                formData[key as keyof typeof formData]
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <Checkbox
                checked={formData[key as keyof typeof formData] as boolean}
                onCheckedChange={(checked) => updateFormData({ [key]: checked })}
                className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">{label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
