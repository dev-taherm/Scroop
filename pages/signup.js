import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { RecaptchaVerifier,signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { LogoIcon } from '../assets/icons';
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../utils/formValidation";
import { auth } from '../services/firebase-config';
import { db } from '../services/firebase-config';

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
    .form-controll {
      margin-bottom: 20px;
      margin-top: 20px;

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

    .form {
      margin-top: 32px;
      font-size: 14px;

      .form-control {
        margin-bottom: 20px;

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
           align: center;
          display: block;
          animation: ${rotation} 1s linear infinite;
        }
      }
    }
    .ext {
      margin-top: 32px;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        font: inherit;
        font-size: 14px;
        border: none;
        outline: none;
        background-color: white;
        color: #4a00e0;
        cursor: pointer;

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

        .icon {
          margin-left: 3px;
          width: 18px;
          height: 18px;
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

const SignUp = () => {
 
  
  const [show, setshow] = useState(false);
  const [otp, setotp] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [startPhoneValidation, setStartPhoneValidation] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  if (user) {
    router.replace('/collections');
  }

  
    const isPhoneValid =
      phoneInput.length !== 0 && validatePhone(phoneInput);

  
  const phoneInputHandler = (ev) => {
    setServerErrorMessage("");
    setPhoneInput(ev.target.value);
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
  };
   const ValidateOtp = (e) => {
     let otp = e.target.value;
     setotp(otp);
     if (otp.length === 6) {
       console.log(otp);

       let confirmationResult = window.confirmationResult;

       confirmationResult
         .confirm(otp)
         .then((result) => {
           // User signed in successfully.
           const user = result.user;
           
           // ...
         })
         .catch((error) => {
           // User couldn't sign in (bad verification code?)
           // ...
           console.log(error);
         });
     }
   };
  

  const submitHandler = (ev) => {
    ev.preventDefault();

    
    setStartPhoneValidation(true);

    if (isPhoneValid && !serverErrorMessage) {
      setIsLoading(true);
       
       generateRecaptcha();
       let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneInput, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("code sent");
          setIsLoading(false);
          setshow(true);
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
        });
       
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <MainNav>
        <Link href="/">القائمة الرئسية</Link> / <span>تسجيل</span>
      </MainNav>
      <Div>
        {user ? (
          <>
            <p>
              You are signed in as <span className="bold">{user.email}</span>.
            </p>
          </>
        ) : (
          <>
            <div className="box">
              <div className="title">
                <LogoIcon />
              </div>
              {serverErrorMessage && (
                <div className="server">{serverErrorMessage}</div>
              )}
              <form className="form" onSubmit={submitHandler}>
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
                {show ? <span> تم ارسالك رسالة نصية الى رقمك</span> : ""}
                <button
                  style={{ display: show ? "none" : "block" }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <span className="loader"></span> : "Sign Up"}
                </button>
              </form>
              <div
                className={`form-controll`}
                style={{ display: show ? "block" : "none" }}
              >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="كلمة المرور"
                  value={otp}
                  onChange={ValidateOtp}
                  onBlur={() => setStartPasswordValidation(false)}
                />
                <span className="hint"></span>
              </div>
            </div>
          </>
        )}
      </Div>
    </>
  );
};

export default SignUp;
