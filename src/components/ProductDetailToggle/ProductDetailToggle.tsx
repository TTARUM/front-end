import React from 'react';
import './ProductDetailToggle.scss';

type Props = {
  currentInform: string;
  setCurrentInform: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProductDetailToggle({
  currentInform,
  setCurrentInform,
}: Props) {
  const changeToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setCurrentInform(target.innerText);
  };

  const navList = ['상품정보', '리뷰24', '문의', '교환/반품'];

  return (
    <div onClick={changeToggle} className="ProductDetailToggle">
      {navList.map((nav, index) => {
        return (
          <div
            key={index}
            className={currentInform === nav ? 'highlight' : 'unHighlight'}
          >
            {nav}
          </div>
        );
      })}
    </div>
  );
}
