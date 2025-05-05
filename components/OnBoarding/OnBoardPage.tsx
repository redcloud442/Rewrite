"use client";

import { Button } from "@/components/ui/button";
import { submitDynamicForm } from "@/lib/helper";
import { userService } from "@/services/user/user-service";
import { useFormStepStore } from "@/store/formStepStore";
import { Form, FormResponse } from "@/types/types";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DynamicFormSection } from "../ReusableForm/ReusableSection";

type OnBoardPageProps = {
  form: Form;
};

const OnBoardSidebarStepper = ({ form }: OnBoardPageProps) => {
  const { userId } = useAuth();

  const methods = useForm<Form>({
    defaultValues: form,
  });

  const { setStepper } = useFormStepStore();

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = form.sections.length;

  const goNext = async (data: FormResponse) => {
    if (!userId) {
      return;
    }

    const missingRequiredFields = data.sections[currentStep].fields.filter(
      (field) => field.field_required && !field.field_response
    );

    if (missingRequiredFields.length > 0) {
      toast.error("Missing required fields", {
        description: "Please fill in all required fields",
      });
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const result = submitDynamicForm({
        formData: data,
        userId: userId || null,
      });

      await userService.createUserOnboarding({
        formData: result,
      });
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setStepper({ currentStep, form });
  }, [currentStep, form, setStepper]);

  const currentSection = form.sections[currentStep];

  return (
    <div className="h-auto w-full">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            goNext(data as FormResponse)
          )}
          className="space-y-6"
        >
          <DynamicFormSection
            section={currentSection}
            sectionIndex={currentStep}
          />

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={goBack}
              disabled={currentStep === 0}
              variant="secondary"
            >
              Back
            </Button>

            <Button type="submit" disabled={methods.formState.isSubmitting}>
              {currentStep === totalSteps - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default OnBoardSidebarStepper;
