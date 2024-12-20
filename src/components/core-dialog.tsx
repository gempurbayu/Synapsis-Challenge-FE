'use client';

import { Button, Modal } from 'antd';
import { ReactNode } from 'react';

export interface CoreDialogProps {
  children: ReactNode;
  onSubmit?: () => void;
  title: string;
  submitTextBtn?: string;
  cancelTextBtn?: string;
  loading?: boolean;
  open: boolean;
  onClose: () => void;
}

const CoreDialog = (props: CoreDialogProps) => {
  const {
    children,
    title,
    loading,
    open,
    onClose,
    onSubmit,
    submitTextBtn,
    cancelTextBtn,
  } = props;

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        title={title}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {cancelTextBtn ? cancelTextBtn : 'Back'}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onSubmit}
          >
            {submitTextBtn ? submitTextBtn : 'Submit'}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default CoreDialog;
