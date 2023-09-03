function getBaseBackendURL() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // return 'http://localhost:8000/';
    return 'https://restsoft.pythonanywhere.com/';
  }
  return 'https://restsoft.pythonanywhere.com/';
}

export const BASE_BACKEND_URL = `${getBaseBackendURL()}api`;
export const LOGIN_URL = `${BASE_BACKEND_URL}/rest-auth/login/`;
export const ADMIN_URL = `${getBaseBackendURL()}admin`;
