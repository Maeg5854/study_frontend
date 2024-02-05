import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");

  const onClick = () => setCounter((curr) => curr + 1);
  const onChange = (event) => setKeyword(event.target.value);

  useEffect(() => {
    console.log("I run only once");
  }, []); // App 으ㅣ 상태가 얼마나 바뀌던지 상관없이 1번만 실행된다.

  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when keyword & counter change");
  }, [keyword, counter]);

  return (
    <div>
      <input
        type="text"
        placeholder="search here..."
        value={keyword}
        onChange={onChange}
      />
      <h1 styles={styles.title}>Welcome back! {counter}</h1>
      <button onClick={onClick}>hello</button>
    </div>
  );
}

export default App;
