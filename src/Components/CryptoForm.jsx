import React from 'react';
import styled from '@emotion/styled';
import useSelectCurrency from '../hooks/useSelectCurrency';
import { useContext, useState } from 'react';
import { CryptoContext } from '../Context/CryptoContext';

const InputSubmit = styled.input`
  width: 90%;
  border: 2px solid white;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: rgb(0,0,33);
  color: white;
  transition: color 0.3s, border 0.3s;
  font-size: 20px;
  margin-top: 32px;
  
  &:hover {
    cursor: pointer;
    background-color: white;
    border: rgb(0,0,33);
    color: rgb(0,0,33);
  }

  &:active {
    transform: (0.9);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Error = styled.p`
  background-color: rgb(255,0,0);
  text-align: center;
  padding: 10px;
`;

function CryptoForm() {
  const { data, setSelectedCurrency, setSelectedCrypto } = useContext(CryptoContext);

  const currencies = [
    { id: 'USD', name: 'US dollar' },
    { id: 'MXN', name: 'Mexican peso' },
    { id: 'EUR', name: 'Euro' },
    { id: 'GBP', name: 'Pound sterling' },
  ];

  const [currency, SelectCurrency] = useSelectCurrency('Select Currency', currencies);
  const [crypto, SelectCrypto] = useSelectCurrency('Select Crypto', data);

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([currency, crypto].includes('')) {
      setError(true);
      return;
    }

    setError(false);
    setSelectedCurrency(currency);
    setSelectedCrypto(crypto);
  };

  return (
    <>
      {error && <Error>All fields are requiered</Error>}
      <Form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCrypto />
        <InputSubmit type="submit" value="Quote" />
      </Form>
    </>
  );
}

export default CryptoForm;
