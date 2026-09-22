import TestForm from '../../TestForm';

export const metadata = { title: 'Thêm đề - Listening 3' };

export default async function NewListeningPart3TestPage({ searchParams }) {
  const params = await searchParams;
  return <TestForm test={null} errorMessage={params?.error} />;
}
