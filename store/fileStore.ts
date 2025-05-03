import { create } from "zustand";

type FileStore = {
  files: {
    id: string;
    audioName: string;
    audioUrl: string | null;
  }[];
  setFiles: (files: {
    id: string;
    audioName: string;
    audioUrl: string;
  }) => void;
};

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  setFiles: (files: { id: string; audioName: string; audioUrl: string }) =>
    set({
      files: [files, ...get().files],
    }),
}));

export const { setFiles } = useFileStore.getState();
export const { files } = useFileStore.getState();
