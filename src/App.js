import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const App = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const socket = io('http://localhost:4000/');

    socket.on('priceUpdate', data => {
      setPrices(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderTableRows = () => {
    return Object.keys(prices).map(symbol => (
      <tr key={symbol}>
        <td>{symbol}</td>
        <td>{prices[symbol]}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>Crypto Price Table</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default App;