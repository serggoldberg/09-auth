import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  const categories = [
    { tag: 'Todo' },
    { tag: 'Work' },
    { tag: 'Personal' },
    { tag: 'Meeting' },
    { tag: 'Shopping' },
  ];

  return (
    <div>
      <main>
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/all`} className={css.menuLink}>
              All notes
            </Link>
          </li>
          {categories.map(({ tag }) => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
