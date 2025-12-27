import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Briefcase, Wrench, Clock, Link } from "lucide-react";
import { cn } from "@/lib/utils";

const disciplines = [
  "Roadway",
  "ADA/PROWAG",
  "Traffic",
  "Drafting",
  "BIM",
  "Other",
];

const tools = [
  "Civil3D",
  "AutoCAD",
  "MicroStation",
  "Revit",
  "Navisworks",
  "Other",
];

export const ProfessionalStep = () => {
  const { formData, updateFormData } = useFormContext();

  const handleDisciplineChange = (discipline: string, checked: boolean) => {
    const newDisciplines = checked
      ? [...formData.disciplines, discipline]
      : formData.disciplines.filter((d) => d !== discipline);
    updateFormData({ disciplines: newDisciplines });
  };

  const handleToolChange = (tool: string, checked: boolean) => {
    const newTools = checked
      ? [...formData.tools, tool]
      : formData.tools.filter((t) => t !== tool);
    updateFormData({ tools: newTools });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Professional Background</h2>
        <p className="text-muted-foreground">Tell us about your expertise and experience</p>
      </div>

      {/* Discipline Tracks */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Briefcase className="w-4 h-4 text-primary" />
          Discipline Track(s) *
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {disciplines.map((discipline) => (
            <label
              key={discipline}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200",
                formData.disciplines.includes(discipline)
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <Checkbox
                checked={formData.disciplines.includes(discipline)}
                onCheckedChange={(checked) => handleDisciplineChange(discipline, checked as boolean)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm font-medium">{discipline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Wrench className="w-4 h-4 text-primary" />
          Tools You Use *
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <label
              key={tool}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200",
                formData.tools.includes(tool)
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <Checkbox
                checked={formData.tools.includes(tool)}
                onCheckedChange={(checked) => handleToolChange(tool, checked as boolean)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm font-medium">{tool}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Years of Experience */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4 text-primary" />
          Years of Relevant Experience *
        </Label>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-display font-bold text-primary">
              {formData.yearsExperience}
            </span>
            <span className="text-sm text-muted-foreground">years</span>
          </div>
          <Slider
            value={[formData.yearsExperience]}
            onValueChange={([value]) => updateFormData({ yearsExperience: value })}
            min={0}
            max={30}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0</span>
            <span>15</span>
            <span>30+</span>
          </div>
        </div>
      </div>

      {/* Portfolio Links */}
      <div className="space-y-2">
        <Label htmlFor="portfolioLinks" className="flex items-center gap-2 text-sm font-medium">
          <Link className="w-4 h-4 text-primary" />
          Portfolio Link(s)
        </Label>
        <Input
          id="portfolioLinks"
          value={formData.portfolioLinks}
          onChange={(e) => updateFormData({ portfolioLinks: e.target.value })}
          placeholder="https://portfolio.com, https://linkedin.com/in/you"
          className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
        />
        <p className="text-xs text-muted-foreground">
          Add 1-2 URLs, separated by comma if multiple
        </p>
      </div>
    </div>
  );
};
