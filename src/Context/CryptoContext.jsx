import React, { createContext, useState, useEffect } from "react";

export const CryptoContext = createContext();

export function CryptoContextProvider(props) {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState();
  const [display, setDisplay] = useState(false);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await fetchData("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD");
      const arrayCrypts = data.Data.map(crypto => ({
        id: crypto.CoinInfo.Name,
        name: crypto.CoinInfo.FullName,
      }));

      setData(arrayCrypts);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedCurrency && selectedCrypto) {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${selectedCurrency}`;

      const fetchDataAndUpdateDisplay = async () => {
        const data = await fetchData(url);
        const arrayCrypts = data.Data.map(crypto => ({
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
          image: crypto.CoinInfo.ImageUrl,
          price: crypto.DISPLAY[selectedCurrency].PRICE,
          lastUpdate: crypto.DISPLAY[selectedCurrency].LASTUPDATE,
          higherPrice: crypto.DISPLAY[selectedCurrency].HIGHDAY,
          lowerPrice: crypto.DISPLAY[selectedCurrency].LOWDAY,
          changue: crypto.DISPLAY[selectedCurrency].CHANGE24HOUR
        }));

        setDisplayData(arrayCrypts.find((crypto) => crypto.id === selectedCrypto));
      };

      fetchDataAndUpdateDisplay();
    }
  }, [selectedCurrency, selectedCrypto]);

  useEffect(() => {
    setDisplay(!!displayData);
  }, [displayData]);

  return (
    <CryptoContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        data,
        setData,
        setSelectedCrypto,
        displayData,
        display,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
}
