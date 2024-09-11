import './App.css'
import Todo from './components/Todo';
import {RecoilRoot} from "recoil";
function App() {
  return (
    <RecoilRoot>
      <Todo/>
    </RecoilRoot>
  )
}

export default App
