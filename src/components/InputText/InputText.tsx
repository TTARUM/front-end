'use client';
import './InputText.scss';

import SearchAddress from '../SearchAddress/SearchAddress';
import EmailAddress from '../EmailAddress/EmailAddress';
import { MainEventButton } from '../Style/MainEventBtn/MainEventBtn';
import { useState } from 'react';

type Props = {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  placeholder: string;
  type?: string;
  onChange?: (InputEvent) => void;
};

const InputText = ({
  data,
  setData,
  title,
  placeholder,
  type,
  onChange,
}: Props): JSX.Element => {

  const [click, setClick] = useState();
  
  return (
    <>
      <span className="label">{title}</span>
      {type === 'search' ? (
        <SearchAddress
          data={data}
          setData={setData}
          placeholder={placeholder}
        />
      ) : type === 'email' ? (
        <EmailAddress setClick={setClick} setData={setData} placeholder={placeholder} />
      ) : type === 'certificationNumber' ? (
        <div className="certificationNumber_input">
          <input
            className="data_input"
            placeholder={placeholder}
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
          <MainEventButton width={48} height={20.35} color={'#FF6135'}>
            확인
          </MainEventButton>
        </div>
      ) : (
        <input
          value={data}
          className="data_input"
          placeholder={placeholder}
          onChange={(e) => (onChange ? onChange(e) : setData(e.target.value))}
        />
      )}
    </>
  );
};

export default InputText;
