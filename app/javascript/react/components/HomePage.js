import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return(
    <div className="home-page">
      <div className="welcome-message">
        <h1 className="home-site-title">
          <Link to={"/campgrounds"}>campr</Link>
        </h1>
      </div>
      <div className="home-page-links">
        <Link className="browse" to={"/campgrounds"}>Browse</Link>
        <a className="add" href="/campgrounds/new">Add</a>
        <a className="signin" href="/users/sign_in">Sign In</a>
      </div>
    </div>
  )
}

export default HomePage;
