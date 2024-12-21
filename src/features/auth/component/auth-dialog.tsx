import CoreDialog from '@/components/core-dialog';
import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import { FieldType } from '../types/auth.type';
import { useSession } from '@/context/session-provider.context';

interface AuthDialogProps {
  open: boolean;
  setCloseDialog: () => void;
}

const AuthDialog = ({ open, setCloseDialog }: AuthDialogProps) => {
  const session = useSession();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    session.setSession(values.name as string, values.accessToken as string);
    setCloseDialog();
  };

  return (
    <CoreDialog
      title="Login"
      open={open}
      cancelTextBtn="Back"
      onClose={setCloseDialog}
      disableBtn
    >
      <Form
        className="mt-4"
        name="basic"
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Access Token"
          name="accessToken"
          rules={[
            { required: true, message: 'Please input your Access Token!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </CoreDialog>
  );
};

export default AuthDialog;
