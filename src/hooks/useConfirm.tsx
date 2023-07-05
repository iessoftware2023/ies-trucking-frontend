import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

export const useConfirmDialog = () => {
  const [modal, modalContextHolder] = Modal.useModal();

  const confirmDialog = (options: { content: React.ReactNode }) => {
    const data = {
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      ...options,
    };

    return new Promise((resolve) => {
      modal.confirm({
        ...data,
        onOk() {
          resolve(true);
        },
        onCancel() {
          resolve(false);
        },
      });
    });
  };

  return {
    modalContextHolder,
    confirmDialog,
  };
};
