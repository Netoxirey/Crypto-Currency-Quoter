import Cryptos from './assets/Cryptos.svg'
import styled from '@emotion/styled'
import CryptoForm from './Components/CryptoForm'
import CryptoCard from './Components/CryptoCard'
import { useContext } from 'react'
import { CryptoContext } from './Context/CryptoContext'

const Container = styled.div `
max-width: 1380px;
width: 90%;
display: grid;
grid-template-columns: repeat(2, 1fr);
margin: 0 auto;

@media (max-width:768px ) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
`
const Image = styled.img `
width: 100%;
object-fit: contain;
`

const Heading = styled.h1 `
font-family: 'Lato', sans-serif;
text-align: center;
font-weight: 700;
`
function App() {

  const {display} = useContext(CryptoContext)
  return (
    <Container>
       <Image src={Cryptos}/>
       <div>
       <Heading>Quote Cryptocurrencies Instantly</Heading>
       <CryptoForm/>
       {display && <CryptoCard/>}

       </div>
    </Container>
  )
}

export default App
