import { useState } from "react";
import { FormProvider, useFormContext } from "@/context/FormContext";
import { Header } from "@/components/Header";
import { MainMenu } from "@/components/MainMenu";
import { OnboardingForm } from "@/components/OnboardingForm";
import { SuccessScreen } from "@/components/SuccessScreen";
import { StatusTracker } from "@/components/StatusTracker";
import { HelpScreen } from "@/components/HelpScreen";

type ViewType = "application" | "status" | "help";

const AppContent = () => {
  const { isSubmitted, applicationStatus } = useFormContext();
  const [activeView, setActiveView] = useState<ViewType>("application");

  const renderContent = () => {
    switch (activeView) {
      case "application":
        return isSubmitted ? <SuccessScreen /> : <OnboardingForm />;
      case "status":
        return (
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground mb-3">
                Application Status
              </h1>
              <p className="text-muted-foreground">
                Track your application progress
              </p>
            </div>
            <StatusTracker status={applicationStatus} />
          </div>
        );
      case "help":
        return <HelpScreen />;
      default:
        return <OnboardingForm />;
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <MainMenu 
        activeView={activeView} 
        onViewChange={setActiveView}
        hasSubmitted={isSubmitted}
      />
      <main className="px-4 py-8 pb-20">
        {renderContent()}
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
};

export default Index;
