'use client';
import Image from 'next/image';
import './InputText.scss';
import search from '../../../public/search-mainColor.svg';

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
        <div className="search_wrapper">
          <input
            value={data}
            placeholder={placeholder}
            onChange={(e) => setData(e.target.value)}
            readOnly
          />
          <Image src={search} alt="search" />
        </div>
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
