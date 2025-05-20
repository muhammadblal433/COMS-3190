import React, { useState } from 'react';
import { Courses } from '../data/Courses';
import Navbar from './Navbar';

// Payment Page
const Payment = ({ cart, setStep, setUserInfo }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  //user info state
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
  });

  //handle changes to the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['name', 'email', 'address'].includes(name)) {
      setUser({ ...user, [name]: value });
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  };

  // Validate form fields
  const isValidForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvcRegex = /^\d{3,4}$/;
    const addressRegex = /^[a-zA-Z0-9\s,.-]{10,}$/;

    const { cardNumber, expiryDate, cvc } = paymentInfo;
    const { name, email, address } = user;

    if (!nameRegex.test(name.trim())) {
      alert('Name must contain only letters and spaces.');
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      alert('Enter a valid email address.');
      return false;
    }

    if (!addressRegex.test(address.trim())) {
      alert('Enter a valid shipping address (at least 10 characters, no special characters).');
      return false;
    }

    if (!cardRegex.test(cardNumber.trim())) {
      alert('Card number must be 16 digits.');
      return false;
    }

    if (!expiryRegex.test(expiryDate.trim())) {
      alert('Expiry must be in MM/YY format (e.g. 05/25).');
      return false;
    }

    if (!cvcRegex.test(cvc.trim())) {
      alert('CVC must be 3 or 4 digits.');
      return false;
    }

    return true;
  };

  //handle submit button
  const handleSubmit = () => {
    if (!isValidForm()) return;

    if (setUserInfo) setUserInfo(user);
    setStep("summary");
  };

  const calculateSubtotal = () =>
    cart.reduce((total, course) => total + course.quantity * parseFloat(course.price), 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.07;
    const processingFee = 2.0;
    return (subtotal + tax + processingFee).toFixed(2);
  };

  return (
    <>
      <Navbar setStep={setStep} />

      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold">Payment Details</h2>

        <div>
          <h3 className="text-xl font-semibold mb-2">Your Order:</h3>
          <ul className="space-y-1 list-disc ml-5">
            {cart.map((course) => (
              <li key={course.offering_id}>
                {course.title} – ${Number(course.price).toFixed(2)} × {course.quantity} = ${(course.price * course.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-md">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
          <p className="text-md">Tax (7%): ${(calculateSubtotal() * 0.07).toFixed(2)}</p>
          <p className="text-md">Processing Fee: $2.00</p>
          <p className="mt-2 font-bold text-lg">Total: ${calculateTotal()}</p>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Shipping Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="123 Main St, City, State ZIP"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="1234567812345678"
              maxLength={16}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Expiry Date (MM/YY):</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="05/25"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">CVC:</label>
            <input
              type="text"
              name="cvc"
              value={paymentInfo.cvc}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="123"
              maxLength={4}
            />
          </div>
        </div>

            {/* button for submit payemnt */}
        <button
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded mt-4 cursor-pointer"
        >
          Submit Payment
        </button>
      </div>
    </>
  );
};

export default Payment;
