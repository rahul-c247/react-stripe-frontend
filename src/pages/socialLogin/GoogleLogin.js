import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function GoogleLogin(){
  const isGmailLoggedIn = localStorage.getItem('gmailLogin');
  const navigate = useNavigate();

  const handleCallback=(response)=>{
    console.log('response',response.credential);
    var userObject = jwtDecode(response.credential)
    navigate('/products');
    localStorage.setItem('gmailLogin',JSON.stringify(userObject));
  }

  useEffect(() => {
    if(isGmailLoggedIn){
      navigate('/products');
    }
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT,
      callback:handleCallback
    })
    window.google.accounts.id.renderButton(
      document.getElementById("googleLogin"),{
      theme:'outline',
      size:'large'
    })
  }, []);

  return(
    <div className="social-buttons" id="googleLogin"></div>
  )
}

export default GoogleLogin