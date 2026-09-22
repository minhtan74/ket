import QuestionForm from '../../QuestionForm';
import { getQuestionById } from '@/lib/models/listeningPart1';

export const metadata = { title: 'Sửa câu hỏi - Listening 1' };

export default async function EditListeningQuestionPage({ params, searchParams }) {
  const { id, qId } = await params;
  const sp = await searchParams;
  const question = await getQuestionById(Number(qId));
  return <QuestionForm testId={Number(id)} question={question} errorMessage={sp?.error} />;
}
