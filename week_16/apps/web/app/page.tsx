import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Admin from "@repo/ui/admin";
import Box from "@repo/ui/box"

export default function Home() {
  return (
    <div className={styles.page}>
      <Button appName="WebAPP">Hehe! clicked from webapp🎭</Button>
      <Admin />
      <Box/>
    </div>
  );
}
