import { useIsLoadingStore } from "@/store/isLoadingStore";
import { useTypingEffect } from "./display-text";

export const MessageBubble = ({
  message,
  isLatest,
  selectedRecordingId,
}: {
  message: { ai: boolean; message: string };
  isLatest: boolean;
  selectedRecordingId: string | null;
}) => {
  const { isLoading } = useIsLoadingStore();
  const typedText = useTypingEffect(message.message, 20, selectedRecordingId);

  const displayedText =
    message.ai && isLatest && isLoading
      ? "Typing..."
      : message.ai
        ? typedText
        : message.message;

  return (
    <div
      className={`rounded-lg px-4 py-2 text-sm max-w-[80%] whitespace-pre-wrap space-y-2 leading-relaxed ${
        message.ai
          ? "bg-muted text-muted-foreground self-start"
          : "bg-primary text-primary-foreground self-end"
      }`}
    >
      {displayedText.split("\n").map((line, i) => {
        const isHeading = line.includes("**") || line.includes("###");
        const isNumbered = line.trim().match(/^\d+\./);

        let cleanLine = line.trim();

        if (isHeading) {
          cleanLine = cleanLine
            .replace(/\*\*/g, "")
            .replace(/^#+\s*/, "")
            .trim();
        }
        return (
          <div
            key={i}
            className={`${
              isHeading
                ? "text-sm font-bold mb-1" // Make heading bigger and bold
                : isNumbered
                  ? "pl-4 font-semibold" // Slightly bold and indented
                  : "text-sm"
            }`}
          >
            {cleanLine}
          </div>
        );
      })}
    </div>
  );
};
