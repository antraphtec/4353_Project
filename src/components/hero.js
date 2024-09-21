import React from "react";

import "./hero.css";

const HERO = (props) => {
  return (
    <div className="hero-container">
      <div className="herohero1">
        <img
          src="/images/world.png"
          alt="image of the world"
          className="hero-image11"
        />
        <div className="herohero2">
          <img
            src="/images/image.png"
            alt="youngboysandyounggirljumping3838"
            className="hero-youngboysandyounggirljumping"
          />
          <span className="hero-text1">
            <span>
              Discover volunteer opportunities and learn how you can make an
              impact in causes you care about.​
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HERO;
