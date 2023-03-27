import React, { useEffect, useState } from 'react';
import { socket } from '../../Socket';
import axios from 'axios';
import TransactionRow from './TransactionRow';
import './admincashview.css';

const AdminCashView = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + localStorage.getItem('token');
  const [balance, setBalance] = useState({
    total: 0,
    benefit: 0,
    id: 0,
  });
  const [transactions, setTransactions] = useState([
    {
      amount: 0,
      Initiator: null,
      id: 0,
    },
  ]);
  socket.on('balance', data => {
    setBalance(data.MRSBalance);
    // console.log('data', data);
    // console.log('transactions', transactions);
    // if(!transactions)
    // console.log('first match', transactions.filter(el => el.id === data.transaction.id)[0]);
    // if (!transactions.filter(el => el.id === data.transaction.id)[0]) {
    setTransactions(prev => {
      if (prev.filter(el => el.id === data.transaction.id)[0]) {
        return prev;
      } else {
        return [
          ...prev,
          { amount: data.change.amount, Initiator: data.change.from, id: data.transaction.id, createdAt: data.transaction.createdAt },
        ];
      }
    });
    // }
  });
  useEffect(() => {
    axios
      .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/balance?userId=' + user.id, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        // console.log('res.data balance', res.data);
        setBalance(res.data.balance);
        setTransactions(res.data.transactions);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return (
    balance && (
      <div className="admin-cash-view-container">
        <p>
          Balance : <span className="balance">${balance.total.toFixed(2)}</span>
        </p>
        <p>
          Benefit : <span className="balance">${balance.benefit}</span>
        </p>
        {transactions &&
          transactions.map((el, i) => {
            return el.id && <TransactionRow data={el} key={i} />;
          })}
      </div>
    )
  );
};

export default AdminCashView;
