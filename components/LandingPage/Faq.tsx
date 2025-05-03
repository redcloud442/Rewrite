import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="space-y-10  mx-auto py-20 bg-red-300">
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is this app for?</AccordionTrigger>
            <AccordionContent>
              It summarizes files and creates notes automatically using AI.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does pricing work?</AccordionTrigger>
            <AccordionContent>
              We offer Free, Pro, and Premium tiers with flexible billing
              options.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I try before paying?</AccordionTrigger>
            <AccordionContent>
              Yes! Start with the Free plan and upgrade whenever you're ready.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Which file formats are supported?
            </AccordionTrigger>
            <AccordionContent>
              TXT, DOCX, PDF, and PPT (depending on your subscription tier).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can teams collaborate on notes?</AccordionTrigger>
            <AccordionContent>
              Yes, team collaboration features are available in the Premium
              plan.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
