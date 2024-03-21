'use client';
import './Checkbox.scss';
import { Dispatch, SetStateAction } from 'react';

type CheckboxProps = {
  title: string;
  data: boolean;
  setData: Dispatch<SetStateAction<boolean>>;
};

const Checkbox = ({ title, data, setData }: CheckboxProps) => {
  return (
    <div className="checkbox_wrapper">
      <input
        type="checkbox"
        id="checkbox"
        className="input_checkbox"
        onChange={() => setData(!data)}
      ></input>
      <label htmlFor="checkbox" className="display_checkbox"></label>
      <label htmlFor="checkbox" className="label_checkbox">
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
