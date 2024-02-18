type ButtonProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
}

export default Button;
