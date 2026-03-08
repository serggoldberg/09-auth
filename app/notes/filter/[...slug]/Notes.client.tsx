'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';

import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  /* const [isModalOpen, setIsModalOpen] = useState(false); */

  const { data, isLoading, isError } = useNotes({ page, search, tag });

  const handlePageChange = (selected: number) => {
    setPage(selected);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  /*  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 */
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={debouncedSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>

        {/* <button className={css.button} onClick={openModal} >
          Create note +
        </button>
        {{isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}} */}
      </header>

      {data?.notes && data.notes.length > 0 && (
        <NoteList
          notes={data?.notes || []}
          isLoading={isLoading}
          isError={isError}
        />
      )}

      {data && data.notes.length === 0 && !isLoading && <p>No notes found</p>}
    </div>
  );
}
