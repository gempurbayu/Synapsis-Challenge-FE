'use client';

import CoreMainLayout from '@/components/core-main-layout';
import FormPost from '@/features/blog-post/components/form-post';
import React from 'react';

const page = () => {
  return (
    <CoreMainLayout>
      <FormPost />
    </CoreMainLayout>
  );
};

export default page;
