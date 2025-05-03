const MissionVision = () => {
  return (
    <section className="space-y-12 text-center relative h-[70vh] mx-auto flex flex-col justify-center items-center px-4 bg-gradient-to-t from-red-300 to-white">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Mission</h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
          To make complex information easy to understand and organize. We
          empower students and professionals by providing intuitive AI-powered
          tools for summarization, note creation, and document management.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Vision</h2>
        <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
          To become the leading AI-driven productivity platform that bridges the
          gap between overwhelming information and actionable knowledge —
          enabling everyone to work smarter, learn faster, and achieve more.
        </p>
      </div>
    </section>
  );
};

export default MissionVision;
