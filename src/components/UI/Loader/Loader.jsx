import { ProgressBar } from 'react-loader-spinner';
import classes from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={classes.loaderWrapper}>
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        borderColor = '#F4442E'
        barColor = '#1A1D2F'
      />
    </div>
  );
};

export default Loader;