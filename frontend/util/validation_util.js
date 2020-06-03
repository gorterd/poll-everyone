const VALID_EMAIL = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-z]{2,}$/

export const validPassword = password => {
  return password.length > 6;
}

export const validName = name => {
  return name.length > 0;
}

export const validEmail = email => {
  return VALID_EMAIL.test(email);
}