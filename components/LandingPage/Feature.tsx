"use client";

import { Accessibility, Download, Mic } from "lucide-react";

const PlatformShowcase = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 space-y-10">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">
          AI-Powered Platform for Students & Professionals
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to summarize, organize, and maximize productivity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* TOP LEFT */}
        <CardWithBar
          title="AI Summarization Speed"
          description="Generate high-quality summaries under 5 seconds with cutting-edge AI."
        />

        {/* TOP RIGHT */}
        <CardWithStats
          title="Pricing That Fits You"
          stats={[
            { label: "Free Users", value: "10K+" },
            { label: "Pro Plan", value: "$9/mo" },
            { label: "Team Plan", value: "$29/mo" },
          ]}
        />

        {/* BOTTOM LEFT */}
        <CardWithIcons
          title="Export & Accessibility"
          description="Export to PDF, Word, or Google Docs. Optimized for all devices and assistive technologies."
          icons={[
            <Download key="download" />,
            <Accessibility key="accessibility" />,
            <Mic key="mic" />,
          ]}
        />

        {/* BOTTOM RIGHT */}
        <CardWithCode
          title="AI Assistant API"
          code={`POST /api/assistant
Headers:
  Authorization: Bearer <your_api_key>
  Content-Type: application/json

Request Body:
{
  "input": "Summarize my notes about psychology and learning techniques.",
  "language": "en",
  "tone": "concise"
}

Response:
{
  "summary": "Your notes summarize key concepts in cognitive psychology and effective learning strategies."
}
`}
          badges={["POST", "v1", "JSON"]}
          description="Easily integrate AI-powered summarization into your apps and workflows."
        />
      </div>
    </section>
  );
};

export default PlatformShowcase;
const CardWithBar = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-xl border bg-muted/20 p-6 text-left shadow-sm space-y-4 hover:shadow-md transition">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
    <div className="flex gap-1 mt-4">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="w-1 h-4 rounded-full bg-primary opacity-70"
          style={{ height: `${Math.random() * 20 + 8}px` }}
        />
      ))}
    </div>
  </div>
);

const CardWithStats = ({
  title,
  stats,
}: {
  title: string;
  stats: { label: string; value: string }[];
}) => (
  <div className="rounded-xl border bg-muted/20 p-6 text-left shadow-sm space-y-4 hover:shadow-md transition">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="rounded-md bg-muted/30 px-4 py-2 text-center">
          <div className="text-primary font-bold">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const CardWithIcons = ({
  title,
  description,
  icons,
}: {
  title: string;
  description: string;
  icons: React.ReactNode[];
}) => (
  <div className="rounded-xl border bg-muted/20 p-6 text-left shadow-sm space-y-4 hover:shadow-md transition">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
    <div className="flex gap-4 mt-4 text-primary">
      {icons.map((icon, idx) => (
        <div key={idx} className="w-8 h-8">
          {icon}
        </div>
      ))}
    </div>
  </div>
);

const CardWithCode = ({
  title,
  code,
  badges,
  description,
}: {
  title: string;
  code: string;
  badges: string[];
  description: string;
}) => (
  <div className="rounded-xl border bg-muted/20 p-6 text-left shadow-sm space-y-4 hover:shadow-md transition">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
    <pre className="bg-background border rounded-lg p-4 text-sm overflow-auto">
      {code}
    </pre>
    <div className="flex gap-2">
      {badges.map((badge, idx) => (
        <div key={idx} className="rounded-md bg-muted/30 px-2 py-1 text-xs">
          {badge}
        </div>
      ))}
    </div>
  </div>
);
