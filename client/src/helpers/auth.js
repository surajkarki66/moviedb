// Set in local storage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

// Remove from local storage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing data to cookie and local storage during signin
export const authenticate = (response) => {
  setLocalStorage("token", response.data.token);
  setLocalStorage("userId", response.data.userId);
};

export const signOut = (next) => {
  removeLocalStorage("token");
  removeLocalStorage("userId");
  next();
};
