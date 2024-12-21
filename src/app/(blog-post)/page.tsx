'use client';

import CoreMainLayout from '@/components/core-main-layout';
import BlogPost from '@/features/blog-post/blog-post';
import React from 'react';

const page = () => {
  return (
    <CoreMainLayout>
      <BlogPost />
    </CoreMainLayout>
  );
};

export default page;
