
import Select from 'react-select';
import './mySelect.scss';

const MySelect = ({options, defaultValue, value, onChange}) => {
  const selectOptions = options.map((option) => ({
    value: option.value,
    label: option.name,
  }));

  const selectValue = selectOptions.find((option) => option.value === value);
  return (
    <div className="my-select__wrapper">
      <Select
        className="my-select"
        classNamePrefix="my-select"
        defaultValue={{ value: '', label: defaultValue }}
        options={selectOptions}
        value={selectValue}
        isSearchable={false}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        
      />
    </div> 
  );
};

export default MySelect;