'use client';

import Write from '@/components/Write/Write';
import React from 'react';

export default function WriteAsk({ params }) {
  return (
    <>
      <Write page={'products'} params={params} />
    </>
  );
}
