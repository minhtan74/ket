import { redirect } from 'next/navigation';
import { getTestById } from '@/lib/models/part7';
import QuestionForm from '../../QuestionForm';

export const metadata = { title: 'Thêm câu hỏi - Part 7' };

export default async function NewQuestionPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const test = await getTestById(Number(id));

  if (!test) redirect('/admin/part7');

  return <QuestionForm test={test} question={null} errorMessage={sp?.error} />;
}
