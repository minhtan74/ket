import { getFieldById } from '@/lib/models/formcompletion';
import FieldForm from '../../FieldForm';

export const metadata = { title: 'Sửa field - Part 6' };

export default async function EditFieldPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const field = await getFieldById(Number(id));

  return <FieldForm field={field} errorMessage={sp?.error} />;
}
