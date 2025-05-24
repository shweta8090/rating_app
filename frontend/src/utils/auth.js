export const getUser = () => JSON.parse(localStorage.getItem('user'));
export const isAuthenticated = () => !!localStorage.getItem('token');
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};
