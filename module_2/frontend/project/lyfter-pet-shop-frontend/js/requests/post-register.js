import { setAccessToken, setRefreshToken } from "../utils/token-manager.js";

export async function registerUser(name, email, password, phone_number) {
  const url = "http://127.0.0.1:5000/auth/register";
  const data = {
    name: name,
    email: email,
    password: password,
    phone_number: phone_number,
  };

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    //console.log("Login response:", response);
    //console.log(user);
    const user = response.data;

    if (user && user.access_token) {
      /* 
       * In a real production environment, you should never store access tokens 
       * in localStorage or sessionStorage due to security risks.
       * 
       * VERY IMPORTANT:  for this exercise:
       *   1. the access token is stored in a variable using setAccessToken() for future 
       *      API calls in the frontend, but it is NOT stored in localStorage or sessionStorage. 
       *  
       *  2. THE CORRECT WAY to handle the refresh token is to use an httpOnly cookie in 
       *     the BACKEND, doing something like:
            
          response.set_cookie(
            "refreshToken",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="Strict",
            max_age=604800
          )
        
        * HOWEVER, for this exercise, and to AVOID modifications and unexpected responses from the BACKEND,
        * the refresh token is gonna be stored in Session Storage, which is not recommended for production environments.
 */

      // save access token using token-manager
      setAccessToken(user.access_token);
      if (user.refresh_token) {
        setRefreshToken(user.refresh_token);
      }

      // save session data to localStorage
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone_number: user.phone_number,
        isLoggedIn: true,
        loginAt: new Date().toISOString(),
      };

      localStorage.setItem("lyfterPetShopSession", JSON.stringify(userData));

      return userData;
    }

    throw new Error("Unexpected problem occurred during registration.");
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Registration failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}
