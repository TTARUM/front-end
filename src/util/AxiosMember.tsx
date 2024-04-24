import { IAddress } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 배송지 조회
const getAddress = (Token: string) => {
  return AxiosConfig.get('/members/address', {
    headers: { Authorization: `Bearer ${Token}` },
  }).then((res) => res.data);
};

// 배송지 추가
const addAddress = (address: IAddress, Token: string) => {
  return AxiosConfig.post('/members/address', address, {
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
};

// 배송지 수정
const updateAddress = (addressId: number, address: IAddress, Token) => {
  return AxiosConfig.post(
    `/members/address/${addressId}`,
    { address },
    { headers: { Authorization: `Bearer ${Token}` } },
  ).then((res) => res);
};

// 배송지 삭제
const deleteAddress = (addressId: number, Token: string) => {
  return AxiosConfig.delete(`/members/address/${addressId}`, {
    headers: { Authorization: `Bearer ${Token}` },
  }).then((res) => res);
};

export { getAddress, addAddress, updateAddress, deleteAddress };
