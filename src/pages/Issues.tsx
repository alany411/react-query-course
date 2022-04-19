import { useState } from 'react';

import IssuesList from '@/components/IssuesList';
import LabelsList from '@/components/LabelsList';

export default function Issues() {
  const [selectedLabels, setSelectedLabels] = useState<Label['id'][]>([]);

  return (
    <div className='grid w-full gap-4 lg:grid-cols-12'>
      <div className='col-span-12 block lg:hidden'>
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
      </div>
      <section className='col-span-12 lg:col-span-8'>
        <IssuesList labels={selectedLabels} />
      </section>
      <aside className='hidden lg:col-span-4 lg:block'>
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
      </aside>
    </div>
  );
}
