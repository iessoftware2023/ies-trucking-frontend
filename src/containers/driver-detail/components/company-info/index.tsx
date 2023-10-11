import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import classNames from "classnames";
import React, { useMemo } from "react";
import _JSXStyle from "styled-jsx/style";

interface IProps {
  enterprise: {
    name: string;
    address: string;
  };
}

export const CompanyInfo: React.FC<IProps> = ({ enterprise }) => {
  const companyInfos = useMemo(() => {
    return [
      {
        label: "Company name",
        value: enterprise.name,
        isFull: false,
      },
      {
        label: "hotline",
        value: null,
        isFull: false,
      },
      {
        label: "company Address",
        value: enterprise.address,
        isFull: true,
      },
      {
        label: "postcode",
        value: null,
        isFull: false,
      },
      {
        label: "Tax code",
        value: null,
        isFull: false,
      },
      {
        label: "Industry",
        value: null,
        isFull: false,
      },
    ];
  }, [enterprise.address, enterprise.name]);

  return (
    <>
      <_JSXStyle jsx>{`
          .collapse-wrapper span.ant-collapse-header-text {
            font-size: 16px;
            font-weight: 600;
            color: #0A0A0A;
          }
          .collapse-wrapper .ant-collapse-header {
            align-items: center !important;
            padding-left: 0 !important;
          }
          .collapse-wrapper .ant-collapse-expand-icon {
            padding-inline-end: 8px;
            margin-inline-start: 0px;
          }

      `}</_JSXStyle>
      <Collapse
        defaultActiveKey={["1"]}
        className="collapse-wrapper"
        ghost
        expandIcon={(panelProps) => (
          <CaretRightOutlined
            style={{
              fontSize: 18,
              transform: panelProps.isActive && "rotateZ(90deg)",
            }}
          />
        )}
        items={[
          {
            key: "1",
            label: "Company Info",
            children: (
              <div className="flex flex-row flex-wrap gap-4">
                {companyInfos.map(({ label, value, isFull }) => (
                  <div
                    key={label}
                    className={classNames(
                      isFull ? "basis-full" : "basis-[calc(50%-8px)]"
                    )}
                  >
                    <div className="flex flex-col gap-y-1">
                      <span className="font-Inter text-xs font-medium uppercase text-neutral-400">
                        {label}
                      </span>
                      <span className="font-Inter text-sm font-medium text-neutral-black">
                        {value ?? "Empty"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
