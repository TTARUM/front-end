import { IOrder } from '@/types/common';
import AxiosConfig from './AxiosConfig';

const showOrders = (orderData: IOrder, Token: string) => {
  return AxiosConfig.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

const getOrders = (itemID, Token:string) =>{
    return AxiosConfig.get(`/orders/${itemID}`)
}

export { showOrders };
