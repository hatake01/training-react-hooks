import React, { useState, useEffect } from 'react';

// const ThisIsAPen = () => <p>This is a pen</p>;
const CountUp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('fire mount');
    const id = setInterval(() => {
      setCount(prev => prev + 1); // This effect depends on the `count` state
      console.log('fire setInterval');
    }, 1000);
    console.log(id);
    return () => {
      console.log('fire unmount', id);
      clearInterval(id);
    };
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
};
export default CountUp;
/*
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}
*/
