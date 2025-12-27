import { Send } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border py-4 px-4">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <Send className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-foreground">
            Team Onboarding
          </h1>
          <p className="text-xs text-muted-foreground">
            Professional Network Application
          </p>
        </div>
      </div>
    </header>
  );
};
