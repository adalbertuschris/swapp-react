import classes from "./Spinner.module.css";

type SpinnerProps = {
  className: string;
};

function Spinner({ className }: SpinnerProps) {
  return (
    <div
      data-test="spinner"
      className={`${classes["spinner-container"]} ${
        className ? className : ""
      }`}
    >
      <div className={classes["spinner"]}>Loading</div>
    </div>
  );
}

export default Spinner;
