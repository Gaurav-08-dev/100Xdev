import "./App.css";
import { useRecoilValue, RecoilRoot, useRecoilState } from "recoil";
import {
  jobAtom,
  messagingAtom,
  myNetworkAtom,
  notificationsAtom,
} from "./atoms";

function MainApp() {
  const networkNotificationCount = useRecoilValue(myNetworkAtom);
  const jobCount = useRecoilValue(jobAtom);
  const [messageCount, setMessageCount] = useRecoilState(messagingAtom);
  const notificationCount = useRecoilValue(notificationsAtom);

  return (
    <>
      <button>Home</button>
      <button>My Network ({networkNotificationCount})</button>
      <button>Jobs ({jobCount})</button>
      <button>Messaging ({messageCount})</button>
      <button>Notification ({notificationCount})</button>
      <button onClick={() => setMessageCount((c) => c + 1)}>Me</button>
    </>
  );
}
function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

export default App;
