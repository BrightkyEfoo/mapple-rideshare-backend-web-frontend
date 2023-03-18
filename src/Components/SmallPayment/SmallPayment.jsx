import React, { useEffect, useState } from 'react';
import './style.css';
import { RxCross1 } from 'react-icons/rx';
import PaymentInputs from '../PaymentInput/PaymentInput';
import { AiOutlineLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { BookRideActions } from '../../rtk/features/BookRide';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavBarActions } from '../../rtk/features/NavBarSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckOutForm/CheckoutForm';
import StripeCheckout from 'react-stripe-checkout';

const stripePromise = loadStripe(
  'pk_test_51MjU5YLDZa2YdiZt2YgpXKsjkAdZD92w1SuZnb3JGPfCMDanOZexRYuZwwNDRrK6Y3bk9ZbIV1GNqa7OnqfA1iBZ00RVMiDjiZ'
);
const SmallPayment = () => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(1);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + localStorage.getItem('token');
  const bookRide = useSelector(state => state.BookRide);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  // const [options, setOptions] = useState(null);
  const options = {
    // passing the client secret obtained in step 3
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  const [form, setForm] = useState({
    seletcted: '',
  });
  const handleChange1 = e => {
    setForm({ ...form, seletcted: e.target.name });
    setPosition(2);
  };
  useEffect(() => {
    axios.get('http://localhost:9001/secret').then(res => {
      console.log('client_secret ', res.data);
      setClientSecret(res.data.client_secret);
    });
  }, []);

  const handlePay = e => {
    // axios
    //   .put(
    //     'http://localhost:9001/map/booking/',
    //     {
    //       userId: user.id,
    //       bookingId: bookRide.actualBooking.id,
    //       state: 0,
    //     },
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   )
    //   .then(res => {
    //     console.log('res.data', res.data);
    //     navigate('/dashboard');
    //     dispatch(BookRideActions.setIsPaymentDisplay(false));
    //     dispatch(NavBarActions.setSelected(1));
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
    axios.get('http://localhost:9001/secret').then(res => {
      console.log('client_secret ', res.data);
      setClientSecret(res.data.client_secret);
      // setOptions({
      //   // passing the client secret obtained in step 3
      //   clientSecret: clientSecret,
      //   // Fully customizable with appearance API.
      //   appearance: {
      //     /*...*/
      //   },
      // });
    });
  };
  const paynow = token => {
    try {
      axios
        .post('http://localhost:9001/payment', {
          amount: 1500,
          token,
        })
        .then(res => {
          console.log('res.data', res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="small-payment-popup-container"
      onClick={e => {
        if (e.target === e.currentTarget) {
          dispatch(BookRideActions.setIsPaymentDisplay(false));
        }
      }}
    >
      {position === 1 && (
        <div className="small-payment-popup-container-1">
          <div>
            <p>Select mass payment gateway</p>{' '}
            <RxCross1
              onClick={() => {
                dispatch(BookRideActions.setIsPaymentDisplay(false));
              }}
              size={25}
            />
          </div>
          <div className="small-payment-popup-sub-container-1">
            {/* <StripeCheckout
              name="Maple RideShare" // the pop-in header title
              description="Ride anywhere!"
              amount={15000} // cents
              currency="USD"
              stripeKey="pk_test_51MjU5YLDZa2YdiZt2YgpXKsjkAdZD92w1SuZnb3JGPfCMDanOZexRYuZwwNDRrK6Y3bk9ZbIV1GNqa7OnqfA1iBZ00RVMiDjiZ"
              email="brightefoo@gmail.com"
              // Note: Enabling either address option will give the user the ability to
              // fill out both. Addresses are sent as a second parameter in the token callback.
              shippingAddress
              billingAddress
              allowRememberMe // "Remember Me" option (default true)
              token={paynow}
            >
              <button name="CC" onClick={handleChange1}>
                Visa / Mastercard / AMEX
              </button>
            </StripeCheckout> */}
            <button name="CC" onClick={handleChange1}>
              Visa / Mastercard / AMEX
            </button>
            <button name="PayPal" /*onClick={handleChange1}*/>PayPal</button>
            <button name="Interact" /*onClick={handleChange1}*/>Interac</button>
          </div>
          {/* <button>Continue</button> */}
        </div>
      )}

      {position === 2 && (
        <div className="small-payment-popup-container-2">
          <div>
            <AiOutlineLeft size={25} onClick={() => setPosition(1)} />
            <p>Card payment gateway</p>
          </div>
          <div className="small-payment-popup-sub-container-2">
            <PaymentInputs />
          </div>
          {/* <button onClick={handlePay}>Make payment</button> */}
        </div>
      )}
    </div>
  );
};

export default SmallPayment;
