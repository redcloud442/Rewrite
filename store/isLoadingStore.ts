import { create } from "zustand";

type IsLoadingStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useIsLoadingStore = create<IsLoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export const { setIsLoading } = useIsLoadingStore.getState();
export const { isLoading } = useIsLoadingStore.getState();
