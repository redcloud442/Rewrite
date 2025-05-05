import { Step, Stepper, StepperReturn } from "@stepperize/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, LucideIcon } from "lucide-react";
import { Fragment, ReactNode } from "react";
import { Button } from "./button";

export interface StepperStep extends Step {
  id: string;
  icon: LucideIcon;
  title: string;
  // stepContent: ReactNode;
}

export type GetStepContentFunc = (
  stepperApi: Stepper<StepperStep[]>
) => ReactNode;

type ScopedStepperProps = {
  stepper: StepperReturn<StepperStep[]>;
};
type ScopedStepperContentProps = {
  stepContents: Record<string, GetStepContentFunc>;
} & ScopedStepperProps;

export const ScopedStepper: React.FC<ScopedStepperContentProps> = ({
  stepper,
  stepContents,
}) => {
  return (
    <div className="backdrop-blur-sm border rounded-xl overflow-hidden shadow-xl w-full">
      <stepper.Scoped>
        <StepperSteps stepper={stepper} />
        <div className="p-8">
          <ScopedStepContent stepper={stepper} stepContents={stepContents} />
          <StepNavigation stepper={stepper} />
        </div>
      </stepper.Scoped>
    </div>
  );
};

function StepperSteps({ stepper }: ScopedStepperProps) {
  const { utils, useStepper } = stepper;
  const _stepper = useStepper();
  const currentIndex = utils.getIndex(_stepper.current.id);
  return (
    <nav className="bg-slate-800/80 p-8">
      <ol className="flex justify-between items-center relative">
        <div className="absolute top-5 left-7 xs:left-12 right-7 h-0.5 bg-slate-900 z-0 w-[93%]">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(currentIndex / (utils.getAll().length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
            className="h-full bg-primary"
          ></motion.div>
        </div>

        {_stepper.all.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center relative flex-shrink-0 z-10 transform-none"
            >
              <div
                className={clsx(
                  "size-10 rounded-full flex items-center justify-center cursor-pointer",
                  "transform-none",
                  isCompleted || isActive
                    ? "bg-primary border-none text-slate-300 dark:text-slate-800"
                    : "border-slate-300 text-slate-300 bg-white dark:bg-slate-800"
                  // "w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors duration-300 select-none"
                )}
              >
                <div className="transform-none">
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
              </div>
              <span
                className={clsx(
                  "text-xs mt-2 hidden sm:block",
                  isCompleted || isActive
                    ? " text-primary/80"
                    : " text-slate-800 dark:text-slate-300"
                )}
              >
                {step.title}
              </span>
            </motion.div>
          );
        })}
      </ol>
    </nav>
  );
}

export function ScopedStepContent({
  stepper,
  stepContents,
}: ScopedStepperContentProps) {
  const _stepper = stepper.useStepper();
  return (
    <Fragment>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-12">
            {_stepper.current.title}
          </h3>
          {stepContents[_stepper.current.id](_stepper)}
        </motion.div>
      </AnimatePresence>
    </Fragment>
  );
}

function StepNavigation({ stepper }: ScopedStepperProps) {
  const _stepper = stepper.useStepper();
  return (
    <div className="mt-8 flex justify-between">
      {!_stepper.isFirst && (
        <Button onClick={_stepper.prev} type="button">
          Indietro
        </Button>
      )}
      <Button
        onClick={_stepper.isLast ? undefined : _stepper.next}
        className="ml-auto"
      >
        {_stepper.isLast ? "Conferma" : "Avanti"}
      </Button>
    </div>
  );
}
