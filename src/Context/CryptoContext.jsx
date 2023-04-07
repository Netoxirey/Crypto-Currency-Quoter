import { createContext, useState, useEffect } from "react"

export const CryptoContext = createContext()

export function CryptoContextProvider(props) {

  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState();
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`)
    .then((respone) => respone.json())
    .then((data) => {
      const arrayCrypts= data.Data.map(crypto => (
        {id: crypto.CoinInfo.Name,
        name: crypto.CoinInfo.FullName,
        }
      ))
       
      return setData(arrayCrypts)
    })
  }, [])

  useEffect(() => {
  fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${selectedCurrency}`)
  .then((response) => response.json())
  .then((data) => {
    const arrayCrypts= data.Data.map(crypto => (
      {id: crypto.CoinInfo.Name,
      name: crypto.CoinInfo.FullName,
      image: crypto.CoinInfo.ImageUrl,
      price: crypto.DISPLAY[selectedCurrency].PRICE,
      lastUpdate: crypto.DISPLAY[selectedCurrency].LASTUPDATE,
      higherPrice: crypto.DISPLAY[selectedCurrency].HIGHDAY,
      lowerPrice: crypto.DISPLAY[selectedCurrency].LOWDAY,
      changue: crypto.DISPLAY[selectedCurrency].CHANGE24HOUR
      }
    ))

    setDisplayData(arrayCrypts.filter((crypto) => crypto.id === selectedCrypto)[0])
  })
  },[selectedCurrency])

useEffect(() => {
   if(displayData) {
    setDisplay(true)
   }
},[displayData])
  return (
    <CryptoContext.Provider value={
      {selectedCurrency,
        setSelectedCurrency,
        data,
        setData,
        setSelectedCrypto,
        displayData,
        display,
      }}>
        {props.children}
    </CryptoContext.Provider>
  )
}

