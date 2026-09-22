import { getQuestionById } from '@/lib/models/part4';
import QuestionForm from '../../QuestionForm';

export const metadata = { title: 'Sửa câu hỏi - Part 4' };

export default async function EditQuestionPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const question = await getQuestionById(Number(id));

  return <QuestionForm question={question} errorMessage={sp?.error} />;
}
