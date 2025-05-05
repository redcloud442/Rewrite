import { Note } from "@/types/types";
import { create } from "zustand";

type NotesStore = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
};

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  setNotes: (notes: Note[]) => set({ notes }),
}));

export const { setNotes } = useNotesStore.getState();
export const { notes } = useNotesStore.getState();
