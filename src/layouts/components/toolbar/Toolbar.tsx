import classes from "./Toolbar.module.css";

type ToolbarProps = {
  children?: React.ReactNode;
};

function Toolbar({ children }: ToolbarProps) {
  return (
    <nav data-test="toolbar" className={classes["toolbar"]}>
      {children}
    </nav>
  );
}

export default Toolbar;
