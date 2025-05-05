import { Form } from "@/types/types";
import { create } from "zustand";

type FormStepStore = {
  stepper: {
    currentStep: number;
    form: Form | null;
  };
  setStepper: (stepper: { currentStep: number; form: Form | null }) => void;
};

export const useFormStepStore = create<FormStepStore>((set) => ({
  stepper: {
    currentStep: 0,
    form: null,
  },
  setStepper: (stepper: { currentStep: number; form: Form | null }) =>
    set({ stepper }),
}));

export const { setStepper } = useFormStepStore.getState();
export const { stepper } = useFormStepStore.getState();
