import React from "react";
import AboutData from "./about";
import {Metadata} from 'next';

export const generateMetadata = () => {
  return{ title:"About Linky Sales" }
}

const About = () => {
  return (
    <div>
      <AboutData/>
    </div>
  );
};

export default About;
