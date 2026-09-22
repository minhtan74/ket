import { redirect } from 'next/navigation';
import { getTestById, getQuestionById } from '@/lib/models/part7';
import QuestionForm from '../../QuestionForm';

export const metadata = { title: 'Sửa câu hỏi - Part 7' };

export default async function EditQuestionPage({ params, searchParams }) {
  const { id, qId } = await params;
  const sp = await searchParams;
  const test = await getTestById(Number(id));

  if (!test) redirect('/admin/part7');

  const question = await getQuestionById(Number(qId));

  return <QuestionForm test={test} question={question} errorMessage={sp?.error} />;
}
