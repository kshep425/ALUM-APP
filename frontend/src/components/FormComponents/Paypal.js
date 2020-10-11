import { get } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";

function Paypal(props) {
  const { payment, anonymous } = props
  const [success, setSuccess] = useState(false);
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: payment.description,
                amount: {
                  currency_code: "USD",
                  value: payment.amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          setSuccess(true)
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      {success
        ? <div>
          <p>Thank you for your ${get(payment, "amount")} {get(payment, "type").toLowerCase() || "payment"}! </p>
          {anonymous
          ? null
          : <p>Go to <Link to={ROUTES.MYMSU}>My MSU Page</Link> to view payment history.</p>
          }

        </div>
        : <div>
          <p>Please complete your ${get(payment, "amount")} {get(payment, "type").toLowerCase() || "payment"} using PayPal</p>
          <div ref={paypal}></div>
        </div>
      }
    </div>
  );
}

export default Paypal;