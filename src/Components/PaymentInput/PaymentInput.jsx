import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import CheckoutForm from '../CheckOutForm/CheckoutForm';
import { useSelector } from 'react-redux';
const stripePromise = loadStripe(
  'pk_test_51MjU5YLDZa2YdiZt2YgpXKsjkAdZD92w1SuZnb3JGPfCMDanOZexRYuZwwNDRrK6Y3bk9ZbIV1GNqa7OnqfA1iBZ00RVMiDjiZ'
);
export default function PaymentInputs() {
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const BookRide = useSelector(state => state.BookRide);
  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
      axios
        .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking/payment?userId=' + user.id + '&id=' + BookRide.actualBooking.id, {
          headers: {
            Authorization: token,
          },
        })
        .then(res => {
          console.log('res.data', res.data);
          setClientSecret(res.data.client_secret);
        });
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret}/>
        </Elements>
      )}
    </div>
  );
}
