import React from 'react';
import detail from '../../../public/detail.svg';
import share from '../../../public/share.svg';
import score from '../../../public/score-star.svg';
import Image from 'next/image';
import './ProductInform.scss';

export default function ProductInform() {
  return (
    <div className="detail-inform">
      <div className="detail-inform-img">
        <Image src={detail} alt="detail" />
      </div>
      <div className="detail-inform-introduce">
        <div>
          <p>
            <span>Christmas Rose</span> <br />
            모젤 크리스마스, 로제
          </p>
          <div>
            <div>
              <Image src={share} alt="share" />
            </div>
          </div>
        </div>
        <p>
          영롱한 핑크빛 색감, 산뜻한 과일 아로마와 가벼운 바디감으로 연인이나
          가족들과 함께 즐기기 좋은 와인입니다.
        </p>
        <div className="detail-inform-score">
          <div>
            <div>
              <Image src={score} fill alt="score" />
            </div>
            <div>
              <Image src={score} fill alt="score" />
            </div>
            <div>
              <Image src={score} fill alt="score" />
            </div>
            <div>
              <Image src={score} fill alt="score" />
            </div>
            <div>
              <Image src={score} fill alt="score" />
            </div>
          </div>
          <span>4.5</span>
          <span>(32)</span>
        </div>

        <h1>35,000원</h1>
      </div>
    </div>
  );
}
