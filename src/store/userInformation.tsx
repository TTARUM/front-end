import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userState } from '@/types/storeType';

const userStore = create(
  persist<userState>(
    (set) => ({
      user: [],
      setUser: (user) => set({ user: user }),
    }),
    {
      name: 'userIdStorage',
    },
  ),
);

export default userStore;
