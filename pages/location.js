import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styled, { keyframes } from "styled-components";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ref, set, child, get } from "firebase/database";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { LogoIcon } from "../assets/icons";
import {
  validatePhone,
  validateStreet,
  validateAddress,
} from "../utils/formValidation";
import { auth } from "../services/firebase-config";
import { db } from "../services/firebase-config";
import { database } from "../services/firebase-config";
import data from "./api/loactionData.json";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";

const MainNav = styled.div`
  font-size: 14px;
  background-color: #f4f4f4;
  padding: 16px;
  text-align: center;

  a {
    text-decoration: none;
    color: inherit;
  }

  span {
    color: #999;
  }
`;

const rotation = keyframes`
  from {
        transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }    
`;

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  p {
    line-height: 1.6;

    .bold {
      font-weight: 600;
    }
  }

  .box {
    border: 1px #eee solid;
    max-width: 500px;
    width: 100%;
    background-color: white;
    padding: 32px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);

    .title {
      margin-top: 16px;
      text-align: center;

      .icon {
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2));
      }
    }

    .server {
      border: 1px #ff4646 solid;
      color: #ff4646;
      border-radius: 6px;
      font-size: 14px;
      padding: 13px;
      margin-top: 24px;
      text-align: center;
    }

    .form {
      margin-top: 32px;
      font-size: 14px;

      .form-control {
        margin-bottom: 20px;

        .selecter {
          display: block;
          font: inherit;
          color: inherit;
          width: 100%;
          padding: 13px 16px;
          outline: none;
          border: 1px #ccc solid;
          border-radius: 6px;
        }

        input {
          display: block;
          font: inherit;
          color: inherit;
          width: 100%;
          padding: 13px 16px;
          outline: none;
          border: 1px #ccc solid;
          border-radius: 6px;

          &::placeholder {
            color: #aaa;
          }

          &:focus {
            border-color: #4a00e0;
          }
        }

        .hint {
          font-size: 13px;
          margin-top: 2px;
          margin-left: 4px;
          color: #ff4646;
          display: none;
        }

        &.error {
          input {
            border-color: #ff4646;
          }

          .hint {
            display: block;
          }
        }
      }

      button {
        font: inherit;
        padding: 13px 16px;
        background: #8e2de2;
        background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0);
        background: linear-gradient(to right, #8e2de2, #4a00e0);
        color: white;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 45px;
        outline: none;
        cursor: pointer;
        border: none;
        border-radius: 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid #fff;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: block;
          animation: ${rotation} 1s linear infinite;
        }
      }
    }

    .info {
      margin-top: 32px;
      margin-bottom: 16px;
      text-align: center;
      font-size: 14px;

      a {
        text-decoration: none;
        color: #4a00e0;

        @media (hover: hover) {
          &:hover {
            text-decoration: underline;
          }
        }

        @media (hover: none) {
          &:active {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media (max-width: 640px) {
    .box {
      border: none;
      box-shadow: none;
      padding: 16px;
    }
  }
`;

const Loaction = () => {
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [addressExists, setAddressExists] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [startStreetValidation, setStartStreetValidation] = useState(false);
  const [startPhoneValidation, setStartPhoneValidation] = useState(false);
  const [startAddressValidation, setStartAddressValidation] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTopp, setIsTopp] = useState(false);

  const counteryCode ="+967";

  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  //const getStreets = data.streets;

  const isAddressValid =
    addressInput.length !== 0 && validateAddress(addressInput);
  const isStreetValid = streetInput.length !== 0 && validateStreet(streetInput);
  const isPhoneValid = phoneInput.length !== 0 && validatePhone(phoneInput);

  const phoneInputHandler = (ev) => {
    setServerErrorMessage("");
    setPhoneInput(ev.target.value);
  };
  const addressInputHandler = (ev) => {
    setServerErrorMessage("");
    setAddressInput(ev.target.value);
  };
  const streetInputHandler = (ev) => {
    setServerErrorMessage("");
    setStreetInput(ev.target.value);
  };
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  }

  const sign = (e) => {

    setStartStreetValidation(true);
    setStartPhoneValidation(true);
    setStartAddressValidation(true);

    e.preventDefault();
    if (
      isAddressValid &&
      isStreetValid &&
      isPhoneValid &&
      !serverErrorMessage
    ) {
      setshow(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneInput, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("code sent");
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
        });
    }
  };

  const ValidateOtp = (e) => {
    let otp = e.target.value;
    setotp(otp);
    if (otp.length === 6) {
      console.log(otp);

      let confirmationResult= window.confirmationResult;

      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          addAddress();
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    }
  };
  if (user) {
    const uid = user.uid;
    const dbRef = ref(database);
    get(child(dbRef, `address/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setAddressExists(snapshot.exists());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const addAddress = () => {
    

    

    if (
      isAddressValid &&
      isStreetValid &&
      isPhoneValid &&
      !serverErrorMessage
    ) {
      setIsLoading(true);
      const email = user.email;
      const uid = user.uid;

      set(ref(database, "address/" + uid), {
        email: email,
        street: streetInput,
        phone: phoneInput,
        address: addressInput,
      })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode === error) {
            setServerErrorMessage(error);
          } else {
            setServerErrorMessage(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Loaction</title>
      </Head>
      <MainNav>
        <Link href="/">القائمة الرئسية</Link> / <span>موقعك</span>
      </MainNav>
      <Div>
        {!user ? (
          <>
            <p>
              قم بتسجيل الدخول لاضافة موقعك الجغرافي{" "}
              <Link href="/signin">تسجيل الدخول</Link>
            </p>
          </>
        ) : (
          <>
            <div className="box">
              <div className="title">
                <LogoIcon />
                {addressExists ? (
                  <p>تعديل الموقع الجغرافي </p>
                ) : (
                  <p>أضافة موقع جغرافي </p>
                )}
              </div>
              {serverErrorMessage && (
                <div className="server">{serverErrorMessage}</div>
              )}
              <form className="form" >
                <div
                  className={`form-control ${
                    startAddressValidation
                      ? isAddressValid
                        ? ""
                        : "error"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    name="addressDaitailes"
                    id="address"
                    placeholder=" ادخل عنوانك با التفصيل"
                    value={addressInput}
                    onChange={addressInputHandler}
                    onBlur={() => setStartAddressValidation(false)}
                  />
                  <span className="hint">{`${
                    startAddressValidation
                      ? addressInput.length === 0
                        ? "ادخل رقم هاتفك"
                        : !validatePhone(addressInput)
                        ? "خطء في رقم الهاتف"
                        : ""
                      : ""
                  }`}</span>
                </div>
                <div
                  className={`form-control ${
                    startStreetValidation ? (isStreetValid ? "" : "error") : ""
                  }`}
                >
                  <Form.Select
                    name="street"
                    id="street"
                    onChange={streetInputHandler}
                    onBlur={() => setStartStreetValidation(false)}
                    value={streetInput}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value={""}>أختر منطقتك</option>
                    {data.streets.map((street) => (
                      <option value={street.name} key={street.id}>
                        {street.name}
                      </option>
                    ))}
                  </Form.Select>
                  <span className="hint">{`${
                    startStreetValidation
                      ? streetInput.length === 0
                        ? "ادخل رقم هاتفك"
                        : !validatePhone(streetInput)
                        ? "خطء في رقم الهاتف"
                        : ""
                      : ""
                  }`}</span>
                </div>

                <div
                  className={`form-control ${
                    startPhoneValidation ? (isPhoneValid ? "" : "error") : ""
                  }`}
                >
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    dir="ltr"
                    placeholder="رقم هاتفك "
                    value={phoneInput}
                    onChange={phoneInputHandler}
                    onBlur={() => setStartPhoneValidation(false)}
                  />
                  <span className="hint">{`${
                    startPhoneValidation
                      ? phoneInput.length === 0
                        ? "ادخل رقم هاتفك"
                        : !validatePhone(phoneInput)
                        ? "خطء في رقم الهاتف"
                        : ""
                      : ""
                  }`}</span>
                </div>
                <div id="recaptcha-container"></div>
                <button type="submit" onClick={sign}>
                  Send OTP
                </button>
                <div style={{ display: show ? "block" : "none" }}>
                  <input
                    type="text"
                    placeholder={"Enter your OTP"}
                    onChange={ValidateOtp}
                    value={otp}
                  ></input>
                  <button
                    type="submit"
                    onClick={ValidateOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loader"></span>
                    ) : addressExists ? (
                      "عدل  "
                    ) : (
                      "أضف "
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </Div>
    </>
  );
};

export default Loaction;
