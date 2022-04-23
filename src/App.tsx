import useMediaQuery from "./hooks/useMediaQuery";

function App() {
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <div>{`The view port is ${
      matches ? "at least" : "less than"
    } 768 pixels wide ádas${matches}`}</div>
  );
}

export default App;
