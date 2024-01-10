'use client';

import React, { useCallback, useState } from 'react';

type Return = [
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
];

export default function useInput(): Return {
  const [text, setText] = useState<string>('');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    [],
  );

  return [text, setText, onChange];
}
