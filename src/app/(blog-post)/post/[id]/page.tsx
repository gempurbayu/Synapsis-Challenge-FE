'use client';

import CoreMainLayout from '@/components/core-main-layout';
import DetailPost from '@/features/blog-post/components/detail-post';
import React from 'react';

const page = () => {
  return (
    <CoreMainLayout>
      <DetailPost />
    </CoreMainLayout>
  );
};

export default page;
