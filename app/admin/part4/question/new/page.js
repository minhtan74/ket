import QuestionForm from '../../QuestionForm';

export const metadata = { title: 'Thêm câu hỏi - Part 4' };

export default async function NewQuestionPage({ searchParams }) {
  const params = await searchParams;
  return <QuestionForm question={null} errorMessage={params?.error} />;
}
