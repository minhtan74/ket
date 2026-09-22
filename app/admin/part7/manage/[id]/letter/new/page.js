import { redirect } from 'next/navigation';
import { getTestById } from '@/lib/models/part7';
import LetterForm from '../../LetterForm';

export const metadata = { title: 'Thêm thư - Part 7' };

export default async function NewLetterPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const test = await getTestById(Number(id));

  if (!test) redirect('/admin/part7');

  return <LetterForm test={test} letter={null} errorMessage={sp?.error} />;
}
