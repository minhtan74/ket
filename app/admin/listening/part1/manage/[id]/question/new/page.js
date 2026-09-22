import QuestionForm from '../../QuestionForm';

export const metadata = { title: 'Thêm câu hỏi - Listening 1' };

export default async function NewListeningQuestionPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  return <QuestionForm testId={Number(id)} question={null} errorMessage={sp?.error} />;
}
