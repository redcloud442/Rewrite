import { create } from "zustand";

type MessageStore = {
  messages: {
    message: string;
    ai: boolean;
  }[];
  setMessages: (messages: { message: string; ai: boolean }) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  setMessages: (messages: { message: string; ai: boolean }) =>
    set({
      messages: [...get().messages, messages],
    }),
}));

export const { setMessages } = useMessageStore.getState();
export const { messages } = useMessageStore.getState();
