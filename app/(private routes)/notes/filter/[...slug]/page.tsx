import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

import NotesByTagClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';
import { Metadata } from 'next';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `Note: ${tag}`,
    description: `Notes filtered by tag: ${tag}`,
    openGraph: {
      title: `Note: ${tag}`,
      description: `Notes filtered by tag: ${tag}`,
      url: `https://notehub.com/notes/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes filtered by tag: ${tag}`,
        },
      ],
      type: 'website',
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesByTagClient tag={tag} />
      </HydrationBoundary>
    </>
  );
}
