import React from "react";
import { TextInput } from './TextInput';
import { useDebouncedState } from '@/hooks/useDebounce';
import { Button } from '../Button';

interface Props {
  selected: string[];
  setSelected: (newSelected: any) => void;
}

export const TransferList = ({ selected, setSelected }: Props) => {
  const [search, setSearch] = useDebouncedState('', 500);
  const [available, setAvailable] = React.useState<SurveyShort[]>([]);
  const [checkedAvailable, setCheckedAvailable] = React.useState<SurveyShort[]>([]);
  const [checkedSelected, setCheckedSelected] = React.useState<SurveyShort[]>([]);

  const handleFetchSurveys = React.useCallback(async function () {
    const response = await fetch(`/api/surveys?search=${search}`);
    const data = await response.json();
    setAvailable(data);
  }, [search]);

  React.useEffect(() => {
    handleFetchSurveys();
  }, [search, handleFetchSurveys]);

  const handleTransferToSelected = () => {
    setSelected([...selected, ...checkedAvailable.map(cheked => cheked.id)]);
    setCheckedAvailable([]);
  };

  const handleTransferToAvailable = () => {
    setAvailable([...available, ...checkedSelected]);
    setSelected(selected.filter(item => !checkedSelected.some(checked => checked.id === item)));
    setCheckedSelected([]);
  };

  return (
    <>
      <label className="text-white">Object Ids</label>
      <div className="flex justify-center">
        <div className="flex-1 p-4 border border-primary rounded-md max-h-96 overflow-y-auto">
          <h2 className="text-lg font-bold text-primary">Available Objects</h2>
          <TextInput required={false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)} name="search" placeholder='Search...' />
          <ul className=''>
            {available.filter(item => !selected.includes(item.id)).map(item => (
              <li key={item.id} className='text-primary'>
                <input
                  type="checkbox"
                  checked={checkedAvailable.some((available) => item.id === available.id)}
                  onChange={() => {
                    setCheckedAvailable(prev =>
                      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                    );
                  }}
                />
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center p-4 gap-4">
          <Button onClick={handleTransferToSelected}>
            {'>>'}
          </Button>
          <Button onClick={handleTransferToAvailable}>
            {'<<'}
          </Button>
        </div>

        <div className="flex-1 p-4  border border-primary rounded-md overflow-y-auto">
          <h2 className="text-lg font-bold text-primary">Selected Objects</h2>
          <ul>
            {available.filter(item => selected.includes(item.id)).map(item => (
              <li key={item.id} className='text-primary'>
                <input
                  type="checkbox"
                  checked={checkedSelected.some((selected) => item.id === selected.id)}
                  onChange={() => {
                    setCheckedSelected(prev =>
                      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                    );
                  }}
                />
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TransferList;
