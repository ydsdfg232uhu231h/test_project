import React from 'react'
import {jwtDecode} from "jwt-decode";
const TokenExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const decodedtokens = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedtokens.exp < currentTime;
  } catch (error) {
    console.log("Error decoding token", error);
    return true;
  }
}

export default TokenExpired;