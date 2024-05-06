'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './Category.scss';

type Props = {
  img: string;
  title: string;
  id: number;
};

export default function Category({ img, title, id }: Props) {
  const router = useRouter();
  return (
    <div
      className="category-area"
      onClick={() => {
        router.push(`/products/${id}`);
      }}
    >
      <div className="category-box">
        <Image src={img} alt={img} />
      </div>
      <p>{title}</p>
    </div>
  );
}
