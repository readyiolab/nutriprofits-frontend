import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const userRole = localStorage.getItem("userRole");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated && userRole) {
      return {
        id: localStorage.getItem("backofficeId") || localStorage.getItem("superadminId") || null,
        name: localStorage.getItem("userName") || "",
        email: localStorage.getItem("userEmail") || "",
        role: userRole,
      };
    }
  } catch (e) {
    console.error("Failed to read initial auth state from localStorage:", e);
  }
  return null;
};

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: getInitialUser(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      
      // Persist to localStorage for page reloads
      if (action.payload.role === "SuperAdmin") {
        localStorage.setItem("superadminId", action.payload.id);
        localStorage.setItem("superadmin_user", JSON.stringify(action.payload));
      } else {
        localStorage.setItem("backofficeId", action.payload.id);
      }
      localStorage.setItem("userName", action.payload.name || "");
      localStorage.setItem("userEmail", action.payload.email || "");
      localStorage.setItem("userRole", action.payload.role);
      localStorage.setItem("isAuthenticated", "true");
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      
      // Clear localStorage persistence
      localStorage.removeItem("backofficeId");
      localStorage.removeItem("superadminId");
      localStorage.removeItem("superadmin_user");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.user?.role || null;

export default authSlice.reducer;
