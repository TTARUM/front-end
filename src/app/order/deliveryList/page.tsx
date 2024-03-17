import Header from '@/components/Header/Header';
import './deliveryList.scss';

export default function Delivery() {
  return (
    <div>
      <Header title="배송지 목록" type="subMenu" />
      <div className="delivery_container">
        <div className="delivery_item">
          <div className="delivery_text">
            <p>우리집</p>
            <p>기본 배송지</p>
            <button>선택</button>
          </div>
          <p className="delivery_userInformation">유지민 ∙ 010-0000-000</p>
          <p>서울 성동구 뚝섬로 273, 1001호 [04770]</p>
          <div className="delivery_btnArea">
            <button>삭제</button>
            <button>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}
