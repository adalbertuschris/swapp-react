import classes from "./Spinner.module.css";

type SpinnerProps = {
  className: string;
};

function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={`${classes["spinner-container"]} ${
        className ? className : ""
      }`}
    >
      <div className={classes["spinner"]}>Loading</div>
    </div>
  );
}

export default Spinner;
