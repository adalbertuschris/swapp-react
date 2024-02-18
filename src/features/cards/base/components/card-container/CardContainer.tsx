type CardContainerProps = {
  children: React.ReactNode;
};

function CardContainer({ children }: CardContainerProps) {
  return <div>{children}</div>;
}

export default CardContainer;
