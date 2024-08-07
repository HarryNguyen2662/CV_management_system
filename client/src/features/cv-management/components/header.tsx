import { AddNewResume } from './add-new-resume';
import { AdvancedFilter } from './advanced-filters';

interface HeaderProps {
  setFilterOptions: React.Dispatch<React.SetStateAction<string[]>>;
  filterOptions: string[];
}

export const Header = ({ filterOptions, setFilterOptions }: HeaderProps) => {
  return (
    <div className="flex w-full mx-auto">
      <div className="flex flex-col gap-2 grow">
        <h1 className="font-bold text-4xl">CoderPush</h1>
        <div className="flex justify-between items-center">
          <p className="text-slate-400">List of resumes on the platform</p>
          <div className="flex w-full max-w-sm items-center justify-end space-x-2">
            {/* <Input placeholder="Search..." /> */}
            <AddNewResume />
            <AdvancedFilter filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
