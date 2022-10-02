import Head from 'next/head';
import styled from 'styled-components';
import Banner from '../components/Banner';



const Div = styled.div`
    

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
      background: linear-gradient(to left, #8e2de2, #4a00e0);
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
      
          <Banner />
          
        
      
      </Div>
      
    </>
  );
};

export default Home;
