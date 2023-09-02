/* eslint-disable */


import Cookies from 'universal-cookie';

export const cookies = new Cookies();

// const defaultCookieOptions = {
//   path: '/',
//   sameSite: 'none',
//   secure: true,
// };
export const setCookie = (name: string, value: string) => {
  cookies.set(name, value);
};

// options = {}, includeDefaultOptions = true
export const getCookie = (name: string) => {
  return cookies.get(name);
};
export const removeCookie = (
  name: string
) => {
  cookies.remove(name);
};
