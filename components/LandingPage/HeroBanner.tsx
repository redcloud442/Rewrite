import { Button } from "../ui/button";
import FeaturesTabs from "./FeatureTabs/FeatureTabs";

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-t from-red-300 to-muted/10 text-center space-y-6  min-h-screen h-full relative flex flex-col justify-center items-center">
      {/* Heading */}
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
          Summarize & Note
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        The single platform to summarize your files & create notes effortlessly.
      </p>

      {/* CTA */}
      <Button size="lg" className="mt-6 px-8 py-6 text-lg">
        Start for Free →
      </Button>
      <FeaturesTabs />
    </section>
  );
};

export default HeroBanner;
