import React, { useState } from 'react';
import BrowseCourses from './components/Browse';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Summary from './components/Summary';

const App = () => {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("browse");
  const [userInfo, setUserInfo] = useState(null); // 🔥 Add this!

  return (
    <div className="app-container">
      {step === "browse" && <BrowseCourses cart={cart} setCart={setCart} setStep={setStep} />}
      {step === "cart" && <Cart cart={cart} setCart={setCart} setStep={setStep} />}
      {step === "payment" && <Payment cart={cart} setStep={setStep} setUserInfo={setUserInfo} />}
      {step === "summary" && <Summary cart={cart} setCart={setCart} setStep={setStep} userInfo={userInfo} />}
    </div>
  );
};

export default App;
