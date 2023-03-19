import React, { useEffect, useState } from 'react';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';
import { useNavigate } from 'react-router-dom';
import { BookRideActions } from '../../rtk/features/BookRide';

export default function CheckoutForm({clientSecret}) {
  const stripe = useStripe();
  const elements = useElements();
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BookRide = useSelector(state => state.BookRide);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    console.log('elements', elements);
    setIsLoading(true);

    // const { error } = await
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          payment_method_data: {
            billing_details: {
              name: `${user.lastName} ${user.firstName}`,
              email: user.email,
              phone: user.phone,
              address: {
                country: user.country,
              },
            },
          },
          
          return_url: 'http://localhost:3001/dashboard',
        },
        redirect : 'if_required'
      })
      .then(({ paymentIntent, error }) => {
        if (!error) {
          console.log('paymentIntent', paymentIntent);
          // dispatch(Book)
          axios.post('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking/checkout' , {
            userId : user.id,
            pi : paymentIntent.id,
            client_secret : clientSecret,
          } , {
            headers : {
              Authorization : token
            }
          }).then(res => {
            dispatch(NotificationActions.addContent({value : 'payment done!' , status : 'OK' , severity :'success'}))
            dispatch(NotificationActions.setIsVisible(true))
            dispatch(NotificationActions.setOnClose('go-dashboard'))
            dispatch(BookRideActions.setIsPaymentDisplay(false));
          })
        }
        else {
          console.log(error);
        }
      })
      .catch(err => {
        console.log('err', err);
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
    fields: {
      billingDetails: {
        email: 'never',
        address: {
          country: 'never',
        },
      },
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="small-payment-button" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
      </button>
    </form>
  );
}
