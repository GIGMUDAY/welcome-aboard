import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, ExternalLink } from "lucide-react";

const faqs = [
  {
    question: "How long does the application review take?",
    answer: "Our team typically reviews applications within 2-3 business days. You'll receive an email notification once your application has been reviewed.",
  },
  {
    question: "Can I update my application after submitting?",
    answer: "Once submitted, applications cannot be directly edited. However, you can contact our support team if you need to make urgent changes.",
  },
  {
    question: "What file formats are accepted for uploads?",
    answer: "We accept PDF, DOC, DOCX, and ZIP files with a maximum size of 19MB. Please ensure your portfolio or resume is in one of these formats.",
  },
  {
    question: "What does each career path mean?",
    answer: "Contributor: Focus on hands-on technical work. Reviewer Track: Quality assurance and technical reviews. PM Track: Project management and team coordination.",
  },
  {
    question: "How are working hours tracked?",
    answer: "Hours are self-reported on a weekly basis. You'll have access to our time tracking system once onboarded.",
  },
];

export const HelpScreen = () => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          Help & Support
        </h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our team
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Chat with our support team in real-time
          </p>
          <Button variant="outline" className="w-full">
            Start Chat
          </Button>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">Email Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Send us an email and we'll respond within 24h
          </p>
          <Button variant="outline" className="w-full">
            Send Email
          </Button>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-display font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="px-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Documentation Link */}
      <div className="mt-6 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          View full documentation
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
