import ReviewWrite from '@/components/ReviewWrite/ReviewWrite';

export default function EditReview({ params }) {
  return (
    <>
      <ReviewWrite isEdit={true} params={params} />
    </>
  );
}
