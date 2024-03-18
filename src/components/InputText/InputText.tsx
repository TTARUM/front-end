'use client';
import './InputText.scss';

import Image from 'next/image';
import search from '../../../public/search-mainColor.svg';

import DaumPostcodeEmbed, { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
import SearchAddress from '../SearchAddress/SearchAddress';

type Props = {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  placeholder: string;
  type?: string;
};

const InputText = ({
  data,
  setData,
  title,
  placeholder,
  type,
}: Props): JSX.Element => {
  return (
    <>
      <span className="label">{title}</span>
      {type === 'search' ? (
        <SearchAddress
          data={data}
          setData={setData}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={data}
          className="data_input"
          placeholder={placeholder}
          onChange={(e) => setData(e.target.value)}
        />
      )}
    </>
  );
};

export default InputText;
