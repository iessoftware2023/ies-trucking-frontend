import { Button, DatePicker, Drawer, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useMemo } from "react";

import { TRACKING_TAB_FILTER_STATUS } from "../../constants";
import { ITrackingTabKey } from "../../types";
import { SelectStatus } from "./SelectStatus";

export type IFormFilterValues = {
  search: string;
  dateRange: [Dayjs, Dayjs] | undefined;
  status: string[];
};

type IRangePreset = {
  label: string;
  value: [Dayjs, Dayjs];
};

type IProps = {
  isOpen: boolean;
  tabKey: ITrackingTabKey;
  initialValues?: IFormFilterValues;

  onClose: () => void;
  onSubmit: (values: IFormFilterValues) => void;
};

export const DrawerFilter: React.FC<IProps> = ({
  isOpen,
  tabKey,
  initialValues,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const statusOptions = TRACKING_TAB_FILTER_STATUS[tabKey];

  const rangePresets = useMemo<IRangePreset[]>(() => {
    return [
      { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
      { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
      { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
      { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
    ];
  }, []);

  const handleClear = useCallback(() => {
    form.setFieldValue("dateRange", undefined);
    form.setFieldValue("status", []);
    form.submit();
  }, [form]);

  const handleApply = useCallback(() => {
    form.submit();
  }, [form]);

  return (
    <Drawer
      title="Filter"
      placement="right"
      open={isOpen}
      footer={
        <div className="flex justify-between">
          <Button size="large" onClick={handleClear}>
            Clear Filter
          </Button>

          <Button type="primary" size="large" onClick={handleApply}>
            Apply
          </Button>
        </div>
      }
      onClose={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          dateRange: undefined,
          status: [],
          ...initialValues,
        }}
        onFinish={onSubmit}
      >
        <Form.Item label="Time Range" name="dateRange">
          <DatePicker.RangePicker
            presets={rangePresets}
            size="large"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Status" name="status" hidden={!statusOptions.length}>
          <SelectStatus options={statusOptions} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
