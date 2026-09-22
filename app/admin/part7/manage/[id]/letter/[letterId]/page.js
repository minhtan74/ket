import { redirect } from 'next/navigation';
import { getTestById, getLetterById } from '@/lib/models/part7';
import LetterForm from '../../LetterForm';

export const metadata = { title: 'Sửa thư - Part 7' };

export default async function EditLetterPage({ params, searchParams }) {
  const { id, letterId } = await params;
  const sp = await searchParams;
  const test = await getTestById(Number(id));

  if (!test) redirect('/admin/part7');

  const letter = await getLetterById(Number(letterId));

  return <LetterForm test={test} letter={letter} errorMessage={sp?.error} />;
}
