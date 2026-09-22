import TestForm from '../../TestForm';

export const metadata = { title: 'Thêm đề - Listening 1' };

export default async function NewListeningTestPage({ searchParams }) {
  const params = await searchParams;
  return <TestForm test={null} errorMessage={params?.error} />;
}
