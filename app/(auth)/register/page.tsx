import React from "react";
import Link from "next/link";

const Register = () => {
  return <div>
    <h3>Register</h3>
    <input type="text" placeholder="Your name" /><br/>
    <input type="text" placeholder="Your username" /><br/>
    <input type="password" placeholder="Your password" /><br/>



    <button  >Submit</button>
    <p><Link href="/login" >Login</Link> if you have an account</p>
  </div>;
};

export default Register;
