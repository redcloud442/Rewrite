"use client";

import { useIsDoneTypingStore } from "@/store/isDoneTypingStore";
import { useEffect, useState } from "react";

export const useTypingEffect = (
  text: string,
  speed = 20,
  selectedRecordingId: string | null
) => {
  const { setIsDoneTyping } = useIsDoneTypingStore();
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setIsDoneTyping(false);
    let index = 0;

    // ✅ If a recording is selected, show full text immediately
    if (selectedRecordingId) {
      setDisplayedText(text);
      setIsDoneTyping(true);
      return;
    }

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setIsDoneTyping(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, selectedRecordingId]);

  return displayedText;
};
