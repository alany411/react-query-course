import cn from 'classnames';

import useLabelsData from '@/hooks/useLabelsData';

export default function LabelItem({ label }: { label: string }) {
  const labelsQuery = useLabelsData();

  if (labelsQuery.isLoading) return null;

  const labelObj = labelsQuery.data?.find((queryLabel) => queryLabel.id === label);
  if (!labelObj) return null;

  return (
    <span
      className={cn('inline-flex items-center rounded px-2 py-0.5 text-xs font-medium', {
        'bg-red-100 text-red-800': labelObj.color === 'red',
        'bg-orange-100 text-orange-800': labelObj.color === 'orange',
        'bg-blue-100 text-blue-800': labelObj.color === 'blue',
        'bg-cyan-100 text-cyan-800': labelObj.color === 'cyan',
        'bg-lime-100 text-lime-800': labelObj.color === 'lime',
        'bg-stone-100 text-stone-800': labelObj.color === 'white',
        'bg-purple-100 text-purple-800': labelObj.color === 'rebeccapurple',
      })}
    >
      {labelObj.name}
    </span>
  );
}
