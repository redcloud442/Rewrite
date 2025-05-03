"use client";

import { useIsDoneTypingStore } from "@/store/isDoneTypingStore";
import { useEffect, useState } from "react";

export const useTypingEffect = (text: string, speed = 20) => {
  const { setIsDoneTyping } = useIsDoneTypingStore();
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setIsDoneTyping(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};
