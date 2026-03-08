import { nextServer } from './api';
import type { Note } from '../../types/note';
import type { NoteTag } from '../../types/note';
import { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: { page, perPage: 12, search, ...(tag && tag !== 'all' && { tag }) },
  });
  return response.data;
};

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
};
