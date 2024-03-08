import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import "./App.css";
import { countAtom, evenSelector } from "./store/atoms/count";

function EventCountRenderer() {
  const isEven = useRecoilValue(evenSelector);
  return <div>{isEven ? "even" : "odd"}</div>;
}
function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return (
    <div>
      <b>{count}</b>
      <EventCountRenderer />
    </div>
  );
}
function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  // const [count, setCount] = useRecoilState(countAtom);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button>
    </div>
  );
}
function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}
function App() {
  return (
    <RecoilRoot>
      <Count />
    </RecoilRoot>
  );
}

export default App;
