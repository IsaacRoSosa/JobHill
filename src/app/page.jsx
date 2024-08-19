import Image from "next/image";
import styles from "./page.module.css";
import { logout } from "./logout/actions";
import DemoClientComponent from "@/components/DemoClientComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <DemoClientComponent />

    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
    </main>
  );
}
