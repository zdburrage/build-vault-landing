
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How accurate are the estimates from BuildVault?",
    answer: "BuildVault delivers construction estimates with 95-98% accuracy for storage unit projects. Our database is regularly updated with current material and labor costs specific to the storage unit industry, and our algorithms are fine-tuned based on thousands of successful projects.",
  },
  {
    question: "Can I customize the materials and labor rates?",
    answer: "Yes, BuildVault allows you to add custom materials, adjust pricing, and modify labor rates to match your specific business requirements and geographical location. You can also save these as templates for future use.",
  },
  {
    question: "How long does it take to create an estimate?",
    answer: "Most users can create a complete, detailed storage unit estimate in 15-30 minutes, compared to the industry average of 4-8 hours using traditional methods. Once you've created your first estimate, subsequent similar projects can be quoted in as little as 5-10 minutes.",
  },
  {
    question: "Can multiple people on my team use the software?",
    answer: "Yes, our Professional and Enterprise plans allow for multiple user accounts with different permission levels. This enables your entire team to collaborate on estimates while maintaining appropriate access controls.",
  },
  {
    question: "Is there a contract or commitment period?",
    answer: "All BuildVault plans are billed monthly with no long-term contract required. You can upgrade, downgrade, or cancel your subscription at any time without penalty.",
  },
  {
    question: "How do I get started with BuildVault?",
    answer: "Simply select your preferred plan and sign up for a 14-day free trial. No credit card is required for the trial period. During your trial, you'll have access to all features of your selected plan, allowing you to fully evaluate the platform.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about BuildVault
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2">Still have questions?</p>
          <p className="font-medium">Contact us at <a href="mailto:support@buildvault.com" className="text-primary hover:underline">support@buildvault.com</a></p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
