import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styled, { keyframes } from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { LogoIcon } from "../assets/icons";
import {
  validatePhone,
} from "../utils/formValidation";
import { auth } from "../services/firebase-config";
import { db } from "../services/firebase-config";
import SelectStreet from "../components/SelectStreet";
import data from "./api/loactionData.json";
import MapMarker from "../components/MapMarker";
import { Wrapper, Status } from "@googlemaps/react-wrapper";


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
  const [addressInput, setAddressInput] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [startStreetValidation, setStartStreetValidation] = useState(false);
  const [startPhoneValidation, setStartPhoneValidation] = useState(false);
  const [startAddressValidation, setStartAddressValidation] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const getStreets = data.streets;


  if (user) {
  }

  
  const isPhoneValid = phoneInput.length !== 0 && validatePhone(phoneInput);
  const isStreetValid = phoneInput.length !== 0;
  const isAddressValid = phoneInput.length != 0;


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
     setStreetInput({ streetInput: ev.target.value });
   };

  const submitHandler = (ev) => {
    ev.preventDefault();

    
    setStartStreetValidation(true);
    setStartPhoneValidation(true);
    setStartAddressValidation(true);

    if (
      isAddressValid &&
      isStreetValid &&
      isPhoneValid &&
      !serverErrorMessage
    ) {
      setIsLoading(true);
    
          const uid = user.uid;
          setDoc(doc(db, uid, "address"), {
            street:streetInput,
            phone: phoneInput,
            address: addressInput,
          })
            .then(() => {
              setDoc(doc(db, uid, "wishlist"), {
                items: [],
              }).then(() => {
                setDoc(doc(db, uid, "cart"), {
                  items: [],
                });
              });
            })
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
              You are not signed in. <Link href="/signin">Sign In</Link>
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
                    startAddressValidation
                      ? isAddressValid
                        ? ""
                        : "error"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder=" ادخل عنوانك با التفصيل"
                    value={addressInput}
                    onChange={addressInputHandler}
                    onBlur={() => setStartAddressValidation(false)}
                  />
                  <span className="hint">Address cannot be empty</span>
                </div>
                <div
                  className={`form-control ${
                    startStreetValidation ? (isStreetValid ? "" : "error") : ""
                  }`}
                >
                  <SelectStreet
                    names={getStreets}
                    name="street"
                    id="street"
                    onChange={streetInputHandler}
                    onBlur={() => setStartStreetValidation(false)}
                    value={streetInput}
                  />
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

                <button type="submit" disabled={isLoading}>
                  {isLoading ? <span className="loader"></span> : "Sign Up"}
                </button>
              </form>
              <p className="info">
                Do you have an account? <Link href="/signin">Sign In</Link>
              </p>
            </div>
          </>
        )}
      </Div>
    </>
  );
};

export default Loaction;

