import React from "react";
import "./mymsupage.css";

const PaymentHistory = props => {
  const payments = props.authUser.payments;

  function formatDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString();
  }

  console.log(payments);

  return (
    <div className="container historyContainer">
      <h1 className="card-title">Payment History</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{formatDate(payment.paymentDate)}</td>
              <td>{payment.description}</td>
              <td>${payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
