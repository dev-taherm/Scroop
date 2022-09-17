import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

const Div = styled.div`
  flex: 1;
  display: flex;
  background-image: url("/landingPage2.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  text-align: center;

  .title {
    font-size: 64px;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    @media (max-width: 640px) {
      font-size: 56px;
    }
  }

  .text {
    margin-top: 30px;
    font-size: 30px;
  }

  a {
    display: block;
    margin-top: 40px;
    padding: 14px 42px;
    text-decoration: none;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    background: #8e2de2;
    background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0);
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const Home = () => {
  return (
    <>
      <Head>
        <title>Scroop</title>
      </Head>
      <Div>
        <p className="title">نرسم الأفضل لنصنع الأفضل.</p>
        <p className="text">ألا تريد الأفضل؟!</p>
        <Link href="/collections">تسوق الان</Link>
      </Div>
    </>
  );
};

export default Home;
