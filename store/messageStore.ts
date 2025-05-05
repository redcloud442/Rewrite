import { create } from "zustand";

type MessageStore = {
  messages: {
    message: string;
    ai: boolean;
  }[];
  setMessages: (messages: { message: string; ai: boolean }) => void;
  setAllMessages: (messages: { message: string; ai: boolean }[]) => void;
  sendMultipleMessages: (messages: { message: string; ai: boolean }[]) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  setMessages: (messages: { message: string; ai: boolean }) =>
    set({
      messages: [...get().messages, messages],
    }),
  setAllMessages: (messages: { message: string; ai: boolean }[]) =>
    set({
      messages,
    }),
  sendMultipleMessages: (messages: { message: string; ai: boolean }[]) =>
    set({
      ...get().messages,
      messages,
    }),
}));

export const { setMessages, setAllMessages } = useMessageStore.getState();
export const { messages } = useMessageStore.getState();
