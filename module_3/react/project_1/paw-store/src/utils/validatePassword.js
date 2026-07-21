// check length and complexity of password
export function isValidPassword(password) {
  // regex to check for at least one uppercase letter,
  // one lowercase letter, one digit and one special character
  // and length between 8 and 18 characters
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,18}$/;
  return regex.test(password);
}
