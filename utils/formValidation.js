export const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  return phone.length >= 9;
};
export const validateStreet = (street) => {
  return street.length >= 0;
};
export const validateAddress = (address) => {
  return address.length >= 15;
};
export const validateName = (name) => {
  return name.length >= 15;
};