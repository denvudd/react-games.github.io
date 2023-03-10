
import classes from './MySelect.module.scss';

const MySelect = ({options, defaultValue, value, onChange}) => {
  return (
    <select className={classes.select} value={value}
            onChange={event => onChange(event.target.value)}
    >
      <option disabled value="">{defaultValue}</option>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          )
        })}
    </select>
  );
};

export default MySelect;