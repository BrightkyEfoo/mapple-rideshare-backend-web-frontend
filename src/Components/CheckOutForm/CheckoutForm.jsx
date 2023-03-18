import React, { useEffect, useState } from 'react';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BookRide = useSelector(state => state.BookRide);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     axios
//       .get('http://localhost:9001/map/booking/payment?userId=' + user.id + '&id=' + BookRide.actualBooking.id, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then(res => {
//         const clientSecret = res.data.client_secret;
//         if (!clientSecret) {
//           return;
//         }

//         stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//           switch (paymentIntent.status) {
//             case 'succeeded':
//               setMessage('Payment succeeded!');
//               break;
//             case 'processing':
//               setMessage('Your payment is processing.');
//               break;
//             case 'requires_payment_method':
//               setMessage('Your payment was not successful, please try again.');
//               break;
//             default:
//               setMessage('Something went wrong.');
//               break;
//           }
//         });
//       });
//   }, [stripe, token]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log('elements', elements);
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
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

        return_url: 'http://localhost:9001/map/checkout',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

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
      {/* <LinkAuthenticationElement id="link-authentication-element" onChange={e => setEmail(e.target.value)} /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="small-payment-button" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}
