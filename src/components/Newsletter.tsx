import React, { useState } from "react";
import { RiCheckLine } from "@remixicon/react";

import foldersImage from "../assets/folders.jpg";
import "./_newsletter.css";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastText, setToastText] = useState("");

  const subscribeAction: React.FormEventHandler<
    HTMLFormElement
  > = async event => {
    event.preventDefault();

    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "appliaction/json" },
      body: JSON.stringify({
        email: email
      })
    };

    const responce = await fetch(
      "https://www.greatfrontend.com/api/projects/challenges/newsletter",
      options
    );

    setShowToast(true);
    if (!responce.ok) {
      setToastHeader("Error");
      setToastText(
        "Failed to submit. Please ensure your details are correct or try again later."
      );
    } else {
      setToastHeader("Success");
      setToastText(
        "Subscription successful! Please check your email to confirm."
      );
      setEmail("");
    }
  };

  return (
    <section className="newsletter">
      {showToast && (
        <div className={`toast ${toastHeader === 'Error' ? "error" : "success"}`} onClick={() => setShowToast(false)}>
          <div className="toast__content">
            <div className="toast__content__title">{toastHeader}</div>
            <p className="toast__content__message text-sm">{toastText}</p>
          </div>
        </div>
      )}

      <div className="newsletter__content">
        <h1 className="newsletter__title text-5xl">
          Get the finest curated abstracts delivered weekly to your inbox
        </h1>
        <ul className="newsletter__features">
          <li className="newsletter__features__feature">
            <RiCheckLine />
            <span className="text-lg">
              Exclusive access to new abstract images and collections
            </span>
          </li>
          <li className="newsletter__features__feature">
            <RiCheckLine />
            <span className="text-lg">
              Unlock special promotions only for subscribers
            </span>
          </li>
          <li className="newsletter__features__feature">
            <RiCheckLine />
            <span className="text-lg">
              Regular doses of artistic inspiration
            </span>
          </li>
        </ul>
        <form className="newsletter__form" onSubmit={subscribeAction}>
          <div className="newsletter__form__content">
            <input
              className="input__field text-sm"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <div className="newsletter__form__info text-base">
              We only send you the best! No spam.
            </div>
          </div>
          <div className="newsletter__form__btn">
            <button className="btn btn-primary text-sm" type="submit">
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <img src={foldersImage} alt="" className="newsletter__image" />
    </section>
  );
};

export default Newsletter;
