import { create } from "zustand";
import storage from "~/utils/storage";

export const useAppStore = create((set) => ({
  userInfo: storage.getUserInfo(),
  setUserInfo: (data) => set(() => ({ userInfo: data })),
}));
