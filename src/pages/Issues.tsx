import IssuesList from '@/components/IssuesList';
import LabelList from '@/components/LabelList';

export default function Issues() {
  return (
    <div className='grid w-full gap-4 lg:grid-cols-12'>
      <div className='col-span-12 block lg:hidden'>
        <LabelList />
      </div>
      <section className='col-span-12 lg:col-span-8'>
        <IssuesList />
      </section>
      <aside className='hidden lg:col-span-4 lg:block'>
        <LabelList />
      </aside>
    </div>
  );
}
