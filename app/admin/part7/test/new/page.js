import TestForm from '../../TestForm';

export const metadata = { title: 'Thêm đề - Part 7' };

export default async function NewTestPage({ searchParams }) {
  const params = await searchParams;
  return <TestForm test={null} errorMessage={params?.error} />;
}
