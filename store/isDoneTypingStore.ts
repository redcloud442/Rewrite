import { create } from "zustand";

type IsDoneTypingStore = {
  isDoneTyping: boolean;
  setIsDoneTyping: (isDoneTyping: boolean) => void;
};

export const useIsDoneTypingStore = create<IsDoneTypingStore>((set) => ({
  isDoneTyping: false,
  setIsDoneTyping: (isDoneTyping: boolean) => set({ isDoneTyping }),
}));

export const { setIsDoneTyping } = useIsDoneTypingStore.getState();
export const { isDoneTyping } = useIsDoneTypingStore.getState();
