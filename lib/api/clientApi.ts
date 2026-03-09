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

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await nextServer.post<User>('/auth/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

/* type CheckSessionRequest = {
  success: boolean;
}; */

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await nextServer.get<User>('/auth/session');
    return data ?? null;
  } catch {
    return null;
  }
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  avatar?: string;
}

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};
