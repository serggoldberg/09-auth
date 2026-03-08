'use client';

import { useRouter } from 'next/navigation';
/* import { Formik, Form, Field, ErrorMessage } from 'formik'; */
/* import * as Yup from 'yup'; */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NewNote } from '@/lib/api';

import css from './NoteForm.module.css';
import { useNoteDraftStore } from '@/lib/store/noteStore';

interface NoteFormValues {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

/* interface NoteFormProps {
  onClose: () => void;
} */

/* const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
}; */

/* const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'Maximum 500 characters'),
  tag: Yup.mixed<NoteFormValues['tag']>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
}); */

export default function NoteForm() {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (note: NewNote) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  /*  const handleSubmit = (values: NoteFormValues) => {
    mutate(values);
  }; */

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get('title') as NoteFormValues['title'];
    const content = formData.get('content') as NoteFormValues['content'];
    const tag = formData.get('tag') as NoteFormValues['tag'];
    mutate({ title, content, tag });
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          value={draft?.title}
          onChange={handleChange}
          id="title"
          name="title"
          className={css.input}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft?.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          value={draft?.tag}
          onChange={handleChange}
          id="tag"
          name="tag"
          className={css.select}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push('/notes/filter/all')}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
