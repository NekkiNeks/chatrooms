import { create } from "zustand";

interface messagesState {
  messages: string[];
  addMessage: (message: string) => void;
}

export const useMessagesStore = create<messagesState>()((set) => ({
  messages: [],

  // actions
  addMessage: (message: string) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
