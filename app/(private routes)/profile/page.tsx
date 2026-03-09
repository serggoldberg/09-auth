import Link from 'next/link';
import css from './Profile.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import { getMeServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Page with profile info',
  openGraph: {
    title: 'Profile',
    description: 'Page with profile info',
    url: 'https://08-zustand-nine-sand.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile',
      },
    ],
    type: 'website',
  },
};

export default async function Profile() {
  const user = await getMeServer();
  return (
    <div>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href={'/profile/edit'} className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username:{user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
