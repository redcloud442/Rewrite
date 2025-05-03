import { BadgeCheckIcon } from "lucide-react";
import { Button } from "../ui/button";

const Pricing = () => {
  return (
    <section className="space-y-10 text-center h-[70vh] relative max-w-7xl mx-auto flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <PricingCard
          title="Free"
          price="Free"
          features={[
            "Upload limit: 5 documents/day",
            "File size limit: 2MB",
            "Supported: TXT, DOCX",
            "Basic summarization",
            "1-paragraph summary output",
            "Limited AI voice reading",
          ]}
        />
        <PricingCard
          title="Pro"
          price="$15/month"
          highlighted
          features={[
            "Upload limit: 50 documents/day",
            "File size limit: 10MB",
            "Supported: PDF, DOCX, TXT, PPT",
            "Summarize + generate notes",
            "AI voice read-aloud (customizable)",
            "Highlight key points",
            "Save/download summaries & notes",
            "Google Drive & Dropbox integration",
            "Export to Notion/Markdown",
          ]}
        />
        <PricingCard
          title="Premium"
          price="$20/month"
          features={[
            "Unlimited uploads",
            "File size up to 100MB",
            "Advanced summarization (sections/chapters)",
            "Multiple note styles: bullet, Cornell, Q&A",
            "Team collaboration & shared notes",
            "Auto-tagging & document search",
            "Custom voice tones",
            "API access",
            "History & version control",
          ]}
        />
      </div>
    </section>
  );
};

export default Pricing;

const PricingCard = ({
  title,
  price,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) => {
  return (
    <div
      className={`rounded-xl border p-6 flex flex-col gap-4 shadow-sm transition
        ${highlighted ? "scale-105 border-primary bg-primary/5 shadow-md" : "bg-muted/10"}
        hover:shadow-lg`}
    >
      <h3
        className={`text-2xl font-bold ${
          highlighted ? "text-primary" : "text-foreground"
        }`}
      >
        {title}
      </h3>
      <p className="text-lg">{price}</p>
      <ul className="text-md text-left text-muted-foreground space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 space-y-4">
            <BadgeCheckIcon className="w-4 h-4 text-green-500 mt-1" />
            <span className="text-md font-medium">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`rounded-md px-4 py-2 mt-auto text-white ${
          highlighted ? "bg-primary" : "bg-muted text-foreground"
        }`}
      >
        {title === "Free" ? "Get Started" : "Choose Plan"}
      </Button>
    </div>
  );
};
