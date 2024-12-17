import React from 'react'
import useTitle from '../hooks/useTitle';

const Home = () => {
  useTitle({ title: "家" });

  return (
    <div>Home</div>
  )
}

export default Home