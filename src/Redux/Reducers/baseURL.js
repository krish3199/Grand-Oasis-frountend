// Base URL configuration - automatically detects environment
const getBaseURL = () => {
  // Check if we're in production (Netlify/Vercel)
  if (import.meta.env.MODE === 'production' || window.location.hostname !== 'localhost') {
    return "https://grand-oasis-backend.onrender.com";
  }
  // Development - use localhost
  return "http://localhost:5000";
};

export const baseURL = getBaseURL();