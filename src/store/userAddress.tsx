import { create } from 'zustand';

const userAddress = create((set) => ({
  address: [],
  setAddress: (address) => set({ address }),
}));

export default userAddress;
