import Image from 'next/image';
import './CollectionBox.scss';

type Props = {
  img: string;
  text: string;
};

export default function CollectionBox({ img, text }: Props) {
  const letter: string = text;
  return (
    <div className="collection-box">
      <Image src={img} alt="collection_1" />
      <p>{text}</p>
    </div>
  );
}
