import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [dollars, setDollars] = useState(0);

  const onChange = (event) => setDollars(event.target.value);
  const onSelect = (event) => {
    console.log(event);
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins!</h1>

      {loading ? (
        <strong>Loading....</strong>
      ) : (
        <div>
          <form onSubmit={onSubmit}>
            <label htmlFor="coin">COIN</label>
            <select id="coin" onChange={onSelect}>
              {coins.map((coin) => (
                <option key={coin.id}>
                  {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
                </option>
              ))}
            </select>
            <label htmlFor="dollar">USD</label>
            <input
              id="dollar"
              value={dollars}
              onChange={onChange}
              type="number"
              placeholder="How much dollars"
            />
            <br />
            <button>Translate</button>
          </form>
          <h3>USD {dollars} is</h3>
        </div>
      )}
    </div>
  );
}

export default App;
