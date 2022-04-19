import { useState } from 'react';

import IssuesList from '@/components/IssuesList';
import LabelsList from '@/components/LabelsList';
import StatusSelect from '@/components/StatusSelect';

export default function Issues() {
  const [selectedLabels, setSelectedLabels] = useState<Label['id'][]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Issue['status']>('');

  console.log(selectedStatus);

  return (
    <div className='grid w-full gap-4 lg:grid-cols-12'>
      <div className='col-span-12 block space-y-4 lg:hidden'>
        <LabelsList
          selected={selectedLabels}
          toggle={(labelId) =>
            setSelectedLabels((currentLabels) =>
              currentLabels.includes(labelId)
                ? currentLabels.filter((currentLabel) => currentLabel !== labelId)
                : currentLabels.concat(labelId)
            )
          }
        />
        <StatusSelect
          value={selectedStatus}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedStatus(event.target.value)}
        />
      </div>
      <section className='col-span-12 lg:col-span-8'>
        <IssuesList labels={selectedLabels} status={selectedStatus} />
      </section>
      <aside className='hidden space-y-4 lg:col-span-4 lg:block'>
        <LabelsList
          selected={selectedLabels}
          toggle={(labelId) =>
            setSelectedLabels((currentLabels) =>
              currentLabels.includes(labelId)
                ? currentLabels.filter((currentLabel) => currentLabel !== labelId)
                : currentLabels.concat(labelId)
            )
          }
        />
        <StatusSelect
          value={selectedStatus}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedStatus(event.target.value)}
        />
      </aside>
    </div>
  );
}
