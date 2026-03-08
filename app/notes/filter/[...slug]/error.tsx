'use client';

export default function Error({ error }: { error: Error }) {
  return <p>Not found!{error.message}</p>;
}
