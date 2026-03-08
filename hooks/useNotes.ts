import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

interface UseNotesProps {
  page: number;
  search: string;
  tag?: string;
}

export const useNotes = ({ page, search, tag }: UseNotesProps) => {
  return useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
  });
};
