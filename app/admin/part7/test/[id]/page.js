import { redirect } from 'next/navigation';
import { getTestById } from '@/lib/models/part7';
import TestForm from '../../TestForm';

export const metadata = { title: 'Sửa đề - Part 7' };

export default async function EditTestPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const test = await getTestById(Number(id));

  if (!test) {
    redirect('/admin/part7');
  }

  return <TestForm test={test} errorMessage={sp?.error} />;
}
