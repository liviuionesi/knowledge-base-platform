import { getDuelData } from '@/app/actions/duel';
import Dashboard from './Dashboard';

export default async function AllianceDuelPage() {
  const allData = await getDuelData();
  return <Dashboard allData={allData} />;
}
