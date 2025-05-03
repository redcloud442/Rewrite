const MetricsSection = () => {
  return (
    <section className="relative py-24 bg-red-300 text-center overflow-hidden">
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
        Fast. Easy to use. Reliable.
      </h2>

      <div className="mt-12 flex flex-wrap justify-center gap-6 bg-muted/30 rounded-2xl px-8 py-8 shadow-lg backdrop-blur-sm max-w-5xl mx-auto">
        {metrics.map((metric, index) => (
          <Metric key={index} number={metric.number} label={metric.label} />
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;

/* --------------- Metric Box Component --------------- */
const Metric = ({ number, label }: { number: string; label: string }) => {
  return (
    <div className="flex flex-col items-center gap-1 px-4 min-w-[120px]">
      <div className="text-4xl font-bold text-primary">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

/* --------------- Metrics Data --------------- */
const metrics = [
  { number: "5s", label: "Avg Summary Time" },
  { number: "99.9%", label: "Platform Uptime" },
  { number: "50K+", label: "Documents Processed" },
  { number: "4.9/5", label: "User Satisfaction" },
  { number: "3M+", label: "Notes Created" },
];
