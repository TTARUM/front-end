import React, { useState } from 'react';

const usePreview = () => {
  const [image, setImage] = useState<string[] | null>([]);
  const [file, setFile] = useState<File[] | null>([]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (!target.files) return;

    const selectedFile = target.files[0];
    setFile((pre) => [...pre, selectedFile]);

    const reader = new FileReader();
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setImage((pre) => [...pre, reader.result as string]);
      };
    }
  };
  return { file, image, handleImage };
};
export default usePreview;
