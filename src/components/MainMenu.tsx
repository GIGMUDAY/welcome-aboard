import { Button } from "@/components/ui/button";
import { FileText, BarChart3, HelpCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MainMenuProps {
  activeView: "application" | "status" | "help";
  onViewChange: (view: "application" | "status" | "help") => void;
  hasSubmitted: boolean;
}

export const MainMenu = ({ activeView, onViewChange, hasSubmitted }: MainMenuProps) => {
  const menuItems = [
    {
      id: "application" as const,
      label: hasSubmitted ? "View Application" : "Start Application",
      icon: hasSubmitted ? FileText : Send,
    },
    {
      id: "status" as const,
      label: "Check Status",
      icon: BarChart3,
      disabled: !hasSubmitted,
    },
    {
      id: "help" as const,
      label: "Help & Support",
      icon: HelpCircle,
    },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-1 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => !item.disabled && onViewChange(item.id)}
                disabled={item.disabled}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 transition-all duration-200",
                  activeView === item.id 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
