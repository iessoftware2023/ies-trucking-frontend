/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from "classnames";
import React from "react";

interface IProps {
  statuses: { title: string; color: string; status: string; count: number }[];
  tabKey: string;
  onChange: (tabKey: string) => void;
}

export const SideBar: React.FC<IProps> = ({ statuses, tabKey, onChange }) => {
  const handleChangeTabKey = (tabKey: string) => () => {
    onChange(tabKey);
  };
  return (
    <div className="sticky inset-y-0 left-0 h-full">
      <div className="flex flex-col gap-2 p-6">
        {statuses.map((d) => (
          <div
            key={d.status}
            onClick={handleChangeTabKey(d.status)}
            className={classNames(
              "inline-flex w-fit cursor-pointer flex-col justify-center border-b-2 border-b-transparent py-2 hover:border-b-yellow-500",
              { "border-b-yellow-500": tabKey === d.status }
            )}
          >
            <div className="font-Inter text-base font-medium leading-snug text-neutral-400">
              {d.title} ({d.count})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
