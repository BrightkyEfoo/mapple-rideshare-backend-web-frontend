import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import styled from 'styled-components';
import './transactionrow.css';
const BlueSpan = styled.span`
  color: ${({ color }) => color || 'black'};
  font-weight: bold;
`;

const TransactionRow = ({ data }) => {
  return (
    <div className="transaction-row-container">
      <span>{data.amount > 0 ? <AiOutlineArrowUp size={20} color="green" /> : <AiOutlineArrowDown color="red" size={17} />}</span>
      <BlueSpan color={data.amount > 0 ? 'green' : 'red'}>${data.amount}</BlueSpan>{' '}
      <span>{`${data.Initiator?.lastName} ${data.Initiator?.firstName}`}</span>
      <span>{new Date(data.createdAt).toLocaleString()}</span>
      {/* <span></span> */}
    </div>
  );
};

export default TransactionRow;
