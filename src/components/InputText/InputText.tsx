'use client';
import './InputText.scss';

import SearchAddress from '../SearchAddress/SearchAddress';
import EmailAddress from '../EmailAddress/EmailAddress';
import { MainEventButton } from '../Style/MainEventBtn/MainEventBtn';
import { useEffect, useState } from 'react';

type Props = {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  placeholder: string;
  type?: string;
  onChange?: (InputEvent) => void;
  warning?: string;
  maxLength?: number;
  path?: string;
  name?: string;
  setCertification?: React.Dispatch<React.SetStateAction<number>>;
  certification?: number;
};

const InputText = ({
  data,
  setData,
  title,
  placeholder,
  type,
  onChange,
  warning,
  maxLength,
  path,
  name,
  setCertification,
  certification,
}: Props): JSX.Element => {
  return (
    <>
      <span className="label">{title}</span>
      {type === 'search' ? (
        <SearchAddress
          data={data || ''}
          setData={setData}
          placeholder={placeholder}
        />
      ) : type === 'email' ? (
        <EmailAddress
          data={data || ''}
          setData={setData}
          placeholder={placeholder}
          path={path}
          name={name}
          setCertification={setCertification}
          certification={certification}
        />
      ) : type === 'password' ? (
        <>
          <input
            value={data || ''}
            type="password"
            className="data_input"
            placeholder={placeholder}
            onChange={(e) => (onChange ? onChange(e) : setData(e.target.value))}
          />
          <p className="warning">{warning}</p>
        </>
      ) : (
        <input
          value={data || ''}
          className="data_input"
          placeholder={placeholder}
          onChange={(e) => (onChange ? onChange(e) : setData(e.target.value))}
          maxLength={maxLength}
        />
      )}
    </>
  );
};

export default InputText;
