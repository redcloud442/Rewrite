import { File } from "@/types/types";
import { create } from "zustand";

type FileStore = {
  files: File[];
  setFiles: (files: File) => void;
  setInitialFiles: (files: File[]) => void;
};

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  setFiles: (files: File) =>
    set({
      files: [files, ...get().files],
    }),
  setInitialFiles: (files: File[]) => set({ files }),
}));

export const { setFiles } = useFileStore.getState();
export const { files } = useFileStore.getState();
export const { setInitialFiles } = useFileStore.getState();
