import React, { useEffect, useState } from 'react';
import './withdraw.css';
import axios from 'axios';

const WithdrawView = () => {
  const token = 'Bearer ' + localStorage.getItem('token');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    axios
      .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/withdraw?userId=' + user.id, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(JSON.parse(localStorage.getItem('user')));
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return (
    user &&
    (user.accessLevel > 0 ? (
      <div className="withdraw-view-container">
        <p>Withdraw</p>
        <div className="withdraw-section-container">
          <p className="withdraw-section-header">Balance</p>
          <div>
            <div>
              <p>
                Your balance: <span className="withdraw-simple-info">${user.balance}</span>
              </p>
              <p>
                Minimum withdraw amount: <span className="withdraw-simple-info">$50.00</span>
              </p>
              <p>
                withdraw threshold: <span className="withdraw-simple-info">0 days</span>
              </p>
            </div>
            <button className="withdraw-simple-button">Request Payment</button>
          </div>
        </div>
        <div className="withdraw-section-container">
          <p className="withdraw-section-header">payment details</p>
          <div>
            <div>
              <p className="withdraw-simple-info">LastPayment</p>
              <p>You do not have any approvet withdraw yet.</p>
            </div>
            <button className="withdraw-simple-button">View payments</button>
          </div>
        </div>
        <div className="withdraw-section-container">
          <p className="withdraw-section-header">Payment methods</p>
          <div>
            <p className="withdraw-simple-raw">
              <span className="icon-span-container">
                {' '}
                <img src="paypal.svg" alt="bank" />
              </span>{' '}
              <span className="withdraw-simple-info">PayPal</span> <span>No information found</span>
            </p>
            <button className="withdraw-no-click-button">Default</button>
          </div>
          <hr />
          <div>
            <p className="withdraw-simple-raw">
              <span className="icon-span-container">
                <img src="bank.svg" alt="bank" />{' '}
              </span>{' '}
              <span className="withdraw-simple-info">Bank Transfert</span> <span>No information found</span>
            </p>
            <button className="withdraw-simple-button">Setup</button>
          </div>
        </div>
      </div>
    ) : (
      <div>Unavailable</div>
    ))
  );
};

export default WithdrawView;
