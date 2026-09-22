import { redirect } from 'next/navigation';
import { getTestById } from '@/lib/models/listeningPart3';
import TestForm from '../../TestForm';

export const metadata = { title: 'Sửa đề - Listening 3' };

export default async function EditListeningPart3TestPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const test = await getTestById(Number(id));

  if (!test) {
    redirect('/admin/listening/part3');
  }

  return <TestForm test={test} errorMessage={sp?.error} />;
}
