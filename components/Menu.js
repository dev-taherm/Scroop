import styled from 'styled-components';
import { useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from 'next/router';
import { db } from '../services/firebase-config';
import { doc, getDoc } from "firebase/firestore";

const Div = styled.div`
  border: 1px #eee solid;
  background-color: white;
  padding: 6px 0;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: calc(100% + 3px);
  left: -6px;
  z-index: 10;
  font-size: 15px;
  width: 250px;

  .special {
    padding: 8px 58px 8px 16px;

    p:first-child {
      font-weight: 600;
    }

    p:nth-child(2) {
      margin-top: 4px;
    }

    .sign {
      display: inline-block;
      border: 1px #4a00e0 solid;
      border-radius: 6px;
      color: #4a00e0;
      padding: 12px 4px;
      margin: 10px 0 6px 0;
      cursor: pointer;
    }
  }

  .divider {
    border-bottom: 1px #eee solid;
    margin: 6px 0;
  }

  .item {
    padding: 8px 16px;
    cursor: pointer;

    &:active {
      background-color: #f4f4f4;
    }
  }
`;

const Menu = ({ onClose, onSignOut }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const signInHandler = () => {
    router.push('/signin');
    onClose();
  };

  const collectionsHandler = () => {
    router.push('/collections');
    onClose();
  };

  const wishlistHandler = () => {
    router.push('/wishlist');
    onClose();
  };

  const cartHandler = () => {
    router.push('/cart');
    onClose();
  };



  return (
    <Div>
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="special">
          {user ? (
            <>
              <p>مرحبا</p>
              <p dir="ltr">{user.email}</p>
            </>
          ) : (
            <>
              <p>مرحبا</p>
              <p>للدخول الى قائمة المفضلات</p>
              <div className="sign" onClick={signInHandler}>
                قم بتسجيل الدخول
              </div>
            </>
          )}
        </div>
        <div className="divider"></div>
        <div className="item" onClick={collectionsHandler}>
          العروض
        </div>
        <div className="item" onClick={wishlistHandler}>
          قائمة المفضلات
        </div>
        <div className="item" onClick={cartHandler}>
          السلة
        </div>
        {user && (
          <div className="item" onClick={onSignOut}>
            تسجيل الخروج
          </div>
        )}
      </OutsideClickHandler>
    </Div>
  );
};

export default Menu;
