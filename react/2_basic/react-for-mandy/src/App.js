import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const onClick = () => setCounter((curr) => curr + 1);

  console.log("i run all the time"); // App의 상태가 바뀔때마다 실행된다

  useEffect(() => {
    console.log("Call the API");
  }, []); // App 으ㅣ 상태가 얼마나 바뀌던지 상관없이 1번만 실행된다.

  return (
    <div>
      <h1 styles={styles.title}>Welcome back! {counter}</h1>
      <button onClick={onClick}>hello</button>
    </div>
  );
}

export default App;
