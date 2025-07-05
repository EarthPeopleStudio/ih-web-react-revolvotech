import React, { createContext, useContext, useReducer, useEffect } from "react";

// Auth Context
const AuthContext = createContext();

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  VERIFY_START: "VERIFY_START",
  VERIFY_SUCCESS: "VERIFY_SUCCESS",
  VERIFY_FAILURE: "VERIFY_FAILURE",
  RESET_PASSWORD_START: "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
  SET_USER: "SET_USER",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Initial State
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  verificationStatus: null, // 'pending', 'verified', 'failed'
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.VERIFY_START:
    case AUTH_ACTIONS.RESET_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.VERIFY_FAILURE:
    case AUTH_ACTIONS.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case AUTH_ACTIONS.VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        verificationStatus: "verified",
        error: null,
      };

    case AUTH_ACTIONS.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Storage keys
const STORAGE_KEYS = {
  TOKEN: "choreo_auth_token",
  USER: "choreo_user_data",
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER);

        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: { user, token },
          });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    };

    initializeAuth();
  }, []);

  // Save auth data to localStorage
  const saveAuthData = (user, token) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  };

  // Clear auth data from localStorage
  const clearAuthData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  };

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // For now, simulate API call - replace with actual API
      const response = await simulateLogin(email, password);

      if (response.success) {
        const { user, token } = response.data;
        saveAuthData(user, token);
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user, token },
        });
        return { success: true };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    clearAuthData();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Verify email function
  const verifyEmail = async (token) => {
    dispatch({ type: AUTH_ACTIONS.VERIFY_START });

    try {
      // Simulate API call - replace with actual API
      const response = await simulateVerification(token);

      if (response.success) {
        dispatch({ type: AUTH_ACTIONS.VERIFY_SUCCESS });
        return { success: true };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.VERIFY_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_START });

    try {
      // Simulate API call - replace with actual API
      const response = await simulatePasswordReset(email);

      if (response.success) {
        dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_SUCCESS });
        return { success: true };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.RESET_PASSWORD_FAILURE,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    logout,
    verifyEmail,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Simulate API functions (replace with actual API calls)
const simulateLogin = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "test@choreo.com" && password === "password") {
        resolve({
          success: true,
          data: {
            user: {
              id: "1",
              email: email,
              name: "Test User",
              verified: true,
            },
            token: "jwt_token_here",
          },
        });
      } else {
        resolve({
          success: false,
          error: "Invalid email or password",
        });
      }
    }, 1000);
  });
};

const simulateVerification = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful verification for demo
      resolve({
        success: true,
        data: { verified: true },
      });
    }, 1000);
  });
};

const simulatePasswordReset = async (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful password reset request
      resolve({
        success: true,
        data: { sent: true },
      });
    }, 1000);
  });
};

export default AuthProvider;
