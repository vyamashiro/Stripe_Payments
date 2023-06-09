import React, { useState, useEffect } from "react";
import "./App.css";

const userId = 'user12345678'
const userCompanyName = 'CompanyABC'

const ProductDisplay = () => (
  <section>

    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Job Announcement</h3>
        <h5>$100.00</h5>
      </div>
    </div>
    
    <form action="/create-checkout-session" method="POST">
      <input type="hidden" name="userId" value={userId}></input>
      <input type="hidden" name="userCompanyName" value={userCompanyName}></input>
      <button type="submit">Buy</button>
    </form>

  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}