// name format and length restrictions
export function nameFormatValidation(name) {
  // letters only and space
  const regex = /^(?=.{5,40}$)(?=.*\s)[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return regex.test(name);
}

// check length and complexity of password
export function checkPasswordStrength(password) {
  // regex to check for at least one uppercase letter,
  // one lowercase letter, one digit and one special character
  // and length between 8 and 18 characters
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,18}$/;
  return regex.test(password);
}

// email format validation
export function emailFormatValidation(email) {
  // at least two characters before the @ symbol, followed by a valid domain name
  // and a top-level domain of at least two characters after the dot.
  // The total length of the email should be between 8 and 30 characters.
  const regex = /^(?=.{8,30}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
}

// phone number format validation
export function phoneNumberFormatValidation(phoneNumber) {
  // 8 digits with a hyphen in the middle
  const regex = /^\d{4}-\d{4}$/;
  return regex.test(phoneNumber);
}

// alphanumeric string length validation
export function stringLengthValidation(str, minLength, maxLength) {
  // check string lenght + some symbols allowed
  const regex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\\s#.,-]+$`,
  );
  return regex.test(str);
}

export function postalCodeValidation(postalCode) {
  // an integer of 5 digits, can be negative
  const regex = /^-?\d{5}$/;
  return regex.test(postalCode);
}

// integer stock quantity validation
export function stockQuantityValidation(quantity) {
  // an integer of 4 digits maximum, can be negative
  const regex = /^-?\d{1,4}$/;
  return regex.test(quantity);
}

// cost and price float format validation
export function costPriceValidation(price) {
  // a positive number with up to two decimal places XXX.xx
  const regex = /^\d{1,3}(\.\d{1,2})?$/;
  return regex.test(price);
}

// SKU code format
export function skuCodeFormatValidation(SKU) {
  // alphanumeric, caps only, between 4 and 30 characters
  const regex = /^(?=.{4,30}$)([A-Z0-9]+(-[A-Z0-9]+)*)$/;
  return regex.test(SKU);
}
