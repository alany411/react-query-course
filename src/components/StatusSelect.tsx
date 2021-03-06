import { possibleStatus } from '@/helpers/defaultData';

type StatusSelectProps = {
  value: Issue['status'];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  noEmptyOption?: boolean;
};

export default function StatusSelect({ value, onChange, noEmptyOption = false }: StatusSelectProps) {
  return (
    <>
      <label htmlFor='status' className='sr-only'>
        Filter issues by status
      </label>
      <select
        id='status'
        name='status'
        value={value}
        onChange={onChange}
        className='mt-1 block w-full cursor-pointer rounded-md border border-stone-700 bg-stone-900 py-2 pl-3 pr-10 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'
      >
        {noEmptyOption ? null : <option value=''>Select a status to filter</option>}
        {possibleStatus.map((pStatus) => (
          <option key={pStatus.id} value={pStatus.id}>
            {pStatus.label}
          </option>
        ))}
      </select>
    </>
  );
}
