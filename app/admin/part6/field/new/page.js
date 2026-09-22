import FieldForm from '../../FieldForm';

export const metadata = { title: 'Thêm field - Part 6' };

export default async function NewFieldPage({ searchParams }) {
  const params = await searchParams;
  return <FieldForm field={null} errorMessage={params?.error} />;
}
