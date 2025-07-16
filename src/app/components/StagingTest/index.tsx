// StagingTest.tsx
'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function StagingTest() {
  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50">
      <Badge className="bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg uppercase tracking-wider text-xs">
        Staging/Test
      </Badge>
    </div>
  );
}
