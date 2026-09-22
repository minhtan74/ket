import { redirect } from 'next/navigation';
import { getTestById } from '@/lib/models/listeningPart1';
import TestForm from '../../TestForm';

export const metadata = { title: 'Sửa đề - Listening 1' };

export default async function EditListeningTestPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const test = await getTestById(Number(id));

  if (!test) {
    redirect('/admin/listening/part1');
  }

  return <TestForm test={test} errorMessage={sp?.error} />;
}
