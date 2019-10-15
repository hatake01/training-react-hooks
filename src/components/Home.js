import React, { useEffect, useRef } from 'react';

const Home = () => {
  const myRef = useRef();
  useEffect(() => {
    console.log('でた！');
    return () => {
      console.log('消えた');
    };
  }, [myRef]);
  return <p>Home</p>;
};
export default Home;
