import React from 'react';
import Navbar from './Navbar';

const Summary = ({ cart, setCart, setStep, userInfo }) => {
  const calculateSubtotal = () =>
    cart.reduce((total, course) => total + course.quantity * parseFloat(course.price), 0);

  // Calculate tax and total
  const tax = calculateSubtotal() * 0.07;
  const processingFee = 2.0;
  const total = (calculateSubtotal() + tax + processingFee).toFixed(2);

  //At the end of the receipt this is the back to browse button functionality
  const handleBackToBrowse = () => {
    setCart([]);
    setStep("browse");
  };

  return (
    <>
      <Navbar setStep={setStep} />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Order Summary</h2>

        <div className="bg-green-700 text-white p-4 rounded mb-6">
          ✅ Payment successful! Thank you for your purchase.
        </div>

        {userInfo && (
          <div className="mb-4 text-sm space-y-1">
            <p><span className="font-bold">Name:</span> {userInfo.name}</p>
            <p><span className="font-bold">Email:</span> {userInfo.email}</p>
            <p><span className="font-bold">Shipping Address:</span> {userInfo.address}</p>
          </div>
        )}

        <ul className="space-y-2 mb-4">
          {cart.map(course => (
            <li key={course.offering_id} className="border rounded p-3 bg-white shadow-sm">
              <p className="font-semibold">{course.title}</p>
              <p className="text-sm text-gray-600">
                {course.id} – ${Number(course.price).toFixed(2)} × {course.quantity} = ${(
                  course.price * course.quantity
                ).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <div className="text-sm space-y-1 mb-4">
          <p>Subtotal: <span className="font-medium">${calculateSubtotal().toFixed(2)}</span></p>
          <p>Tax (7%): <span className="font-medium">${tax.toFixed(2)}</span></p>
          <p>Processing Fee: <span className="font-medium">${processingFee.toFixed(2)}</span></p>
        </div>

        <p className="mt-2 font-bold text-xl">Total Paid: ${total}</p>

        <button
          onClick={handleBackToBrowse}
          className="mt-6 bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded cursor-pointer"
        >
          Back to Browse
        </button>
      </div>
    </>
  );
};

export default Summary;
