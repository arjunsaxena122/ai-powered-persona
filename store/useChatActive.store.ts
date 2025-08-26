import { create } from "zustand";

interface IChatStore {
  chatUser: string | null;
  isActiveChat: string | null;
  setIsActiveChat: (username: string) => void;
}

export const useChatActiveStore = create<IChatStore>((set) => ({
  chatUser: null,
  isActiveChat: null,
  setIsActiveChat: (username: string) =>
    set({ isActiveChat: username, chatUser: username }),
}));
