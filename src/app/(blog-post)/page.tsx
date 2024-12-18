'use client';

import CoreDialog from '@/components/core-dialog';
import { Button } from 'antd';
import React, { useState } from 'react';

const page = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <CoreDialog
        title="Test"
        onClose={() => setOpen(false)}
        open={open}
        onSubmit={handleOk}
      >
        {' '}
        Diam
      </CoreDialog>{' '}
    </>
  );
};

export default page;
