import { TailSpin } from 'react-loader-spinner';
import classes from './LoaderContent.module.scss'

const LoaderContent = () => {
  return (
    <div className={classes.loaderWrapper}>
      <TailSpin
        height="60"
        width="60"
        color = '#fff'
        ariaLabel="tail-spin-loading"
        radius="2"
      />
    </div>
  );
};

export default LoaderContent;