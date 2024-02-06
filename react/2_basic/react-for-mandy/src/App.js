import styles from "./App.module.css";
import { useEffect, useState } from "react";

function Hello() {
  return <h1>Hello</h1>;
}
function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  useEffect(() => {
    console.log("showing!!");
    return () => console.log("hide!!");
  }, [showing]);
  return (
    <div>
      <button onClick={onClick}>{showing ? "hide" : "show"}</button>
      {showing ? <Hello /> : null}
    </div>
  );
}

export default App;
