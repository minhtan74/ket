import QuestionForm from '../../QuestionForm';
import { getQuestionById } from '@/lib/models/listeningPart3';

export const metadata = { title: 'Sửa câu hỏi - Listening 3' };

export default async function EditListeningPart3QuestionPage({ params, searchParams }) {
  const { id, qId } = await params;
  const sp = await searchParams;
  const question = await getQuestionById(Number(qId));
  return <QuestionForm testId={Number(id)} question={question} errorMessage={sp?.error} />;
}
