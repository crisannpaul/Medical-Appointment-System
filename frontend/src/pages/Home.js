import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is the LH Medical booking site.  Register or login and book an appointment today!</p>
      <div style={{display: "grid", height: "100%"}}>
        <img style={{maxWidth: "100%", maxHeight: "100vh", margin: "auto"}} src="nci.jpg" alt=""/>
      </div>
    </div>
  );
}

export default Home;