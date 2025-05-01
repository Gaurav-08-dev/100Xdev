const Box = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <h1>Box Component</h1>
      {children}
    </div>
  );
};

export default Box;