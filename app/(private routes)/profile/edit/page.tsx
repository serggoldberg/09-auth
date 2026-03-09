'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, updateMe, UpdateUserRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';
import { User } from '@/types/user';
import Image from 'next/image';
import Loading from '@/app/loading';

import css from './EditProfilePage.module.css';

function ProfileEditPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = () => {
    router.back();
  };

  useEffect(() => {
    if (!user) {
      getMe()
        .then((data: User) => {
          setUser(data);
          setUserName(data.username);
        })
        .catch(error => setError(error.message));
    } else {
      setUserName(user.username);
    }
  }, [user, setUser]);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const userCange: UpdateUserRequest = {
        username: formData.get('username') as string,
      };

      const updateUser = await updateMe(userCange);
      setUser(updateUser);
      router.push('/profile');
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        {isLoading && <Loading />}

        {error && <p className={css.error}>{error}</p>}

        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user ? user.avatar : '/default-avatar.svg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {userName}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={userName}
              name="username"
              onChange={ev => setUserName(ev.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ProfileEditPage;
