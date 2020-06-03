const VALID_EMAIL = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-z]{2,}$/

export const invalidPassword = password => {
  return password.length() > 6;
}

export const invalidName = name => {
  return name.length() > 0;
}

export const invalidEmail = email => {
  return VALID_EMAIL.test(email);
}