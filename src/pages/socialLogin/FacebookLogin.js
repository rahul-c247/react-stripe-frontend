import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FacebookLogin(){
  const navigate = useNavigate();
  
  useEffect(()=>{
    const isFacebookLoggedIn = localStorage.getItem('facebookLogin')
  window.fbAsyncInit = function() {
    window.FB.init({
      appId      : process.env.REACT_APP_FACEBOOK_APPID,
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    window.FB.Event.subscribe('auth.authResponseChange', function(response) {
      if (response.status === 'connected') {
        testAPI();
      } else if (response.status === 'not_authorized') {
        window.FB.login();
      } else {
        window.FB.login();
      }
    });
  };
  
  (function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));

  function testAPI() {
    window.FB.api('/me', {fields: 'picture, name'}, function(response) {
      /* console.log('Facebook account connected',response); */
      localStorage.setItem('facebookLogin',JSON.stringify(response))
      navigate('/products')
    });
  }
    if(isFacebookLoggedIn){
      navigate('/products')
    }
  },[])

  return(
    <div className="social-buttons">
      <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
    </div>
  )
}

export default FacebookLogin