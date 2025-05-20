import React, { useState } from 'react';
import Navbar from './Navbar';

const Cart = ({ cart, setCart, setStep }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  //method for popup display
  const showPopup = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  //const to remove something from the cart and then display popup
  const removeFromCart = (offering_id) => {
    setCart(cart.filter(course => course.offering_id !== offering_id));
    showPopup("🗑️ Item successfully removed from cart");
  };

  //const to increase the quantity of the item in the cart
  const increaseQty = (offering_id) => {
    setCart(cart.map(course =>
      course.offering_id === offering_id
        ? { ...course, quantity: course.quantity + 1 }
        : course
    ));
  };

  //const to decrease the quantity of the item in the cart
  const decreaseQty = (offering_id) => {
    setCart(cart.map(course =>
      course.offering_id === offering_id && course.quantity > 1
        ? { ...course, quantity: course.quantity - 1 }
        : course
    ));
  };

  //const to calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, course) => total + course.quantity * parseFloat(course.price), 0).toFixed(2);
  };

  
  return (
    <>
      <Navbar setStep={setStep} />
      <div className="p-6 relative">
        {showToast && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg z-50 transition-opacity duration-300">
            {toastMessage}
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
        <h4 className="text-lg mb-4">Remember to change the <em>quantities</em> of the <em>classes</em> in your <em>cart</em>, if you wish to take the same <em>class</em> multiple times!</h4>
        <br />

        {cart.length === 0 ? (
          <p className="text-lg">Your cart is empty. Please add a course to your cart to proceed.</p>
        ) : (
          <div className="space-y-4">
            {cart.map(course => (
              <div key={course.offering_id} className="flex items-center justify-between border rounded p-4 shadow-sm bg-white transform hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-sm text-black">{course.id} | {course.instructor}</p>
                  <p className="text-sm text-black">
                    ${Number(course.price).toFixed(2)} × {course.quantity} = <strong>${(course.price * course.quantity).toFixed(2)}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={() => decreaseQty(course.offering_id)}>−</button>
                  <span className="px-2">{course.quantity}</span>
                  <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={() => increaseQty(course.offering_id)}>+</button>
                  <button
                    className="ml-4 bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() => removeFromCart(course.offering_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-xl font-bold mt-6">
              Total: ${calculateTotal()}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => setStep("payment")}
                className="bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded cursor-pointer"
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => setStep("browse")}
                className="bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
