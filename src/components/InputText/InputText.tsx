'use client';
import './InputText.scss';

import SearchAddress from '../SearchAddress/SearchAddress';

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
          onChange={(e) => (onChange ? onChange(e) : setData(e.target.value))}
        />
      )}
    </>
  );
};

export default InputText;
