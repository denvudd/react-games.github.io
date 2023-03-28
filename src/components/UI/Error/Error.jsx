
import classes from './Error.module.scss';

const Error = () => {
  return (
    <div className={classes.contentError}>
      <div className={classes.contentErrorWrapper}>
        <span className={classes.contentErrorIcon}></span>
        <div className={classes.contentErrorText}>
          <h2 className={classes.contentErrorTitle}>Woops! Something went wrong...</h2>
          <p className={classes.contentErrorP}>We are unable to download this content at this time. Please try again later.</p>
        </div>
      </div>
    </div>
  );
};

export default Error;