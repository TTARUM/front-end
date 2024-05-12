'use client';
import ReviewWrite from '@/components/ReviewWrite/ReviewWrite';

export default function NewReview({ params }) {
  return (
    <>
      <ReviewWrite isEdit={false} params={params} />
    </>
  );
}
