"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Brain, ChartLine, File, Speaker } from "lucide-react";

const features = [
  {
    value: "tts",
    label: "TTS",
    icon: <Speaker className="w-10 h-10 text-red-500" />,
    items: [
      {
        title: "Natural Voice Output",
        points: [
          "Convert summaries into high-quality audio",
          "Multiple voice styles & languages",
          "Adjust speed & tone easily",
        ],
      },
      {
        title: "Flexible Export",
        points: [
          "Export TTS files in MP3 or WAV",
          "Integrate with podcast platforms",
          "One-click audio sharing",
        ],
      },
      {
        title: "Accessibility",
        points: [
          "Designed for visually impaired users",
          "Mobile and desktop playback",
          "Syncs with note content",
        ],
      },
    ],
  },
  {
    value: "ai",
    label: "AI Help",
    icon: <Brain className="w-10 h-10 text-red-500" />,
    items: [
      {
        title: "Smart Suggestions",
        points: [
          "Summarization improvements over time",
          "Contextual suggestions for clarity",
          "Inline editing assistance",
        ],
      },
      {
        title: "Query Assistance",
        points: [
          "Instant answers to doc-related questions",
          "Suggest related content",
          "Boosts efficiency by 40%",
        ],
      },
      {
        title: "Continuous Learning",
        points: [
          "AI adapts to user preferences",
          "Advanced document type detection",
          "Personalized writing style support",
        ],
      },
    ],
  },
  {
    value: "notes",
    label: "Note Creation",
    icon: <File className="w-10 h-10 text-red-500" />,
    items: [
      {
        title: "Auto-Note Generation",
        points: [
          "Generate actionable notes from summaries",
          "Tag & categorize automatically",
          "Quick edit features",
        ],
      },
      {
        title: "Export & Sync",
        points: [
          "Export to PDF, Word, or Notion",
          "Sync with Google Docs",
          "One-click sharing",
        ],
      },
      {
        title: "Collaborative Notes",
        points: [
          "Team note editing",
          "Version history tracking",
          "Comments & suggestions support",
        ],
      },
    ],
  },
  {
    value: "tracking",
    label: "Tracking",
    icon: <ChartLine className="w-10 h-10 text-red-500" />,
    items: [
      {
        title: "Progress History",
        points: [
          "Track document summarization history",
          "View session logs",
          "Download activity reports",
        ],
      },
      {
        title: "Revision Tracking",
        points: [
          "See note revisions & version history",
          "Revert to previous versions",
          "Compare changes easily",
        ],
      },
      {
        title: "Insights Dashboard",
        points: [
          "See usage patterns",
          "Identify most used features",
          "Tailor AI suggestions based on trends",
        ],
      },
    ],
  },
];

/* ---------------------- MAIN COMPONENT ---------------------- */

const FeaturesTabs = () => {
  return (
    <section className="space-y-10 text-center max-w-6xl mx-auto">
      <Tabs defaultValue="tts" className="w-full">
        {/* TABS LIST */}
        <div className="flex justify-center">
          <TabsList className="gap-2 bg-muted rounded-lg p-1">
            {features.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* TABS CONTENT */}
        {features.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            asChild
            className="bg-muted"
          >
            <div className="mt-8 grid md:grid-cols-3 gap-6 bg-muted p-10 rounded-lg">
              {tab.items.map((item, idx) => (
                <FeatureCard
                  key={idx}
                  title={item.title}
                  points={item.points}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default FeaturesTabs;

/* ---------------------- FEATURE CARD ---------------------- */

const FeatureCard = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <div className="border rounded-xl p-6 bg-muted/10 shadow-sm space-y-4 text-left">
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex gap-2 items-start">
            <BadgeCheck className="text-green-500 mt-1 w-5 h-5" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
