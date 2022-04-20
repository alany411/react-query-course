import { useState } from 'react';

import IssuesList from '@/components/IssuesList';
import LabelsList from '@/components/LabelsList';
import StatusSelect from '@/components/StatusSelect';

export default function Issues() {
  const [selectedLabels, setSelectedLabels] = useState<Label['id'][]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Issue['status']>('');
  const [pageNum, setPageNum] = useState(1);

  const AsideContent = () => (
    <>
      <LabelsList
        selected={selectedLabels}
        toggle={(labelId) => {
          setSelectedLabels((currentLabels) =>
            currentLabels.includes(labelId)
              ? currentLabels.filter((currentLabel) => currentLabel !== labelId)
              : currentLabels.concat(labelId)
          );
          setPageNum(1);
        }}
      />
      <div className='rounded-md bg-stone-800 p-4'>
        <h2 className='mb-2 text-xl font-semibold tracking-wider'>Status</h2>
        <StatusSelect
          value={selectedStatus}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedStatus(event.target.value);
            setPageNum(1);
          }}
        />
      </div>
    </>
  );

  return (
    <div className='grid w-full gap-4 lg:grid-cols-12'>
      <div className='col-span-12 block space-y-4 lg:hidden'>
        <AsideContent />
      </div>
      <section className='col-span-12 lg:col-span-8'>
        <IssuesList labels={selectedLabels} status={selectedStatus} pageNum={pageNum} setPageNum={setPageNum} />
      </section>
      <aside className='hidden space-y-4 lg:col-span-4 lg:block'>
        <AsideContent />
      </aside>
    </div>
  );
}
