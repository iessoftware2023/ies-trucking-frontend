import React from "react";

import { StepItem } from "./StepItem";
import { IStep } from "./types";

type IProps = {
  steps: IStep[];
  current: number;
};

export const Steps: React.FC<IProps> = ({ steps, current }) => {
  return (
    <div className="relative">
      <div className="absolute left-3 h-full border-[0.5px] border-dashed border-neutral-500" />

      <div className="space-y-4">
        {steps.map((step, index) => {
          return (
            <StepItem
              key={index}
              type={
                index === 0
                  ? "start"
                  : index === steps.length - 1
                  ? "end"
                  : "step"
              }
              index={index}
              title={step.title}
              content={step.content}
              isDone={index <= current}
            />
          );
        })}
      </div>
    </div>
  );
};
