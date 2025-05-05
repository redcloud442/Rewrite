"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useFormStepStore } from "@/store/formStepStore";
import { CheckCircle2 } from "lucide-react";

export const OnboardingSidebar = () => {
  const { stepper } = useFormStepStore();

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader>
        <h2 className="text-xl font-semibold px-2">Onboarding Steps</h2>
      </SidebarHeader>

      <SidebarContent>
        <div className="relative flex flex-col space-y-8 py-4 px-6">
          {/* Vertical connecting line */}
          <div className="absolute w-0.5 bg-gray-200 left-11 top-8 bottom-8 z-0"></div>

          {stepper.form?.sections.map((section, index) => {
            const isActive = stepper.currentStep === index;
            const isCompleted = stepper.currentStep > index;

            return (
              <div key={index} className="relative z-10 flex items-center">
                {/* Circle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-10 h-10 rounded-full p-0 flex-shrink-0",
                    isActive
                      ? "bg-red-500 text-white"
                      : isCompleted
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <span className="font-medium text-sm">{index + 1}</span>
                  )}
                </Button>

                {/* Label */}
                <span
                  className={cn(
                    "ml-3 text-sm",
                    isActive ? "text-red-500 font-medium" : "text-gray-600"
                  )}
                >
                  {section.section_name}
                </span>
              </div>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
