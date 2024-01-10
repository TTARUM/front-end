import React from 'react';
import './ProductDetailChange.scss';
import { changePeriod, noChangeGuide } from '@/constants/productDetail';

export default function ProductDetailChange() {
  return (
    <div className="ProductDetailChange">
      <div className="changePerid">
        <h1>교환/반품 신청기간</h1>
        <ul>
          {changePeriod.map((data, index) => {
            return <li key={index}>{data.content}</li>;
          })}
        </ul>
      </div>
      <div className="noChangeGuide">
        <h1>교환/반품 불가안내</h1>
        <ul>
          {noChangeGuide.map((data, index) => {
            return <li key={index}>{data.content}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
