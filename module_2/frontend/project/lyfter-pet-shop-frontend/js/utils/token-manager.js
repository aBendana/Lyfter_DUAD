let _accessToken = null;

// access token
export function setAccessToken(token) {
  _accessToken = token;
}

export function getAccessToken() {
  return _accessToken;
}

export function clearAccessToken() {
  _accessToken = null;
}

// refresh token
export function setRefreshToken(token) {
  sessionStorage.setItem("lyfterPetShopRefreshToken", token);
}

export function getRefreshToken() {
  return sessionStorage.getItem("lyfterPetShopRefreshToken");
}

export function clearRefreshToken() {
  sessionStorage.removeItem("lyfterPetShopRefreshToken");
}
