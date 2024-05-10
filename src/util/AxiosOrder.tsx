import { IOrder } from '@/types/common';
import AxiosConfig from './AxiosConfig';

const showOrders = (orderData: IOrder, Token: string) => {
  return AxiosConfig.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

const getOrders = (itemID: number, Token: string) => {
  return AxiosConfig.get(`/orders/${itemID}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

const getOrdersList = (page: number, Token: string) => {
  return AxiosConfig.get(`/orders/list`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};
export { showOrders, getOrders, getOrdersList };
