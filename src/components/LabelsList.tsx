import cn from 'classnames';
import { GoPrimitiveDot } from 'react-icons/go';

import useLabelsData from '@/hooks/useLabelsData';

type LabelsListProps = {
  selected: Label['id'][];
  toggle: (labelId: Label['id']) => void;
};

export default function LabelsList({ selected, toggle }: LabelsListProps) {
  const labelsQuery = useLabelsData();

  return (
    <div className='rounded-md bg-stone-800 p-4'>
      <h2 className='mb-4 text-xl font-semibold tracking-wider'>Labels</h2>
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='flex flex-wrap gap-2'>
          {labelsQuery.data?.map((label) => (
            <li key={label.id}>
              <button
                onClick={() => toggle(label.id)}
                className={cn('inline-flex items-center rounded px-2 py-0.5 text-xs font-medium', {
                  'bg-red-100 text-red-800': label.color === 'red',
                  'bg-orange-100 text-orange-800': label.color === 'orange',
                  'bg-blue-100 text-blue-800': label.color === 'blue',
                  'bg-cyan-100 text-cyan-800': label.color === 'cyan',
                  'bg-lime-100 text-lime-800': label.color === 'lime',
                  'bg-stone-100 text-stone-800': label.color === 'white',
                  'bg-purple-100 text-purple-800': label.color === 'rebeccapurple',
                })}
              >
                {selected.includes(label.id) && <GoPrimitiveDot className='mr-1.5' />}
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
