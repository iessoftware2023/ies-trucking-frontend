import React from "react";

export const STEP_OBJ = {
  start: {
    mask: {
      top: 0,
      bottom: undefined,
    },
  },
  step: {
    mask: {
      top: undefined,
      bottom: undefined,
    },
  },
  end: {
    mask: {
      top: undefined,
      bottom: 0,
    },
  },
};

const IconIndex: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-100">
      <span>{index + 1}</span>
    </div>
  );
};

const IconDone: React.FC = () => {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-green-200 bg-green-100 text-green-400">
      <i className="fas fa-check-circle" />
    </div>
  );
};

export const StepItem: React.FC<{
  type: keyof typeof STEP_OBJ;
  index: number;
  title: string;
  content: string;
  isDone?: boolean;
}> = ({ type, index, title, content, isDone }) => {
  const obj = STEP_OBJ[type];

  return (
    <div className="relative flex items-center">
      {["start", "end"].includes(type) && (
        <div
          className="absolute flex h-1/2 w-6 bg-white"
          style={{ top: obj.mask.top, bottom: obj.mask.bottom }}
        />
      )}

      <div className="z-1 mr-4">
        {isDone ? <IconDone /> : <IconIndex index={index} />}
      </div>

      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        {content ? <div className="gray.400">{content}</div> : null}
      </div>
    </div>
  );
};
