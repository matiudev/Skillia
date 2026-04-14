import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { supabase } from "./lib/supabase";
import { useAuthStore } from "./store/authStore";

const { setUser } = useAuthStore.getState();

supabase.auth.getUser().then(({ data }) => {
  setUser(data.user);
});

supabase.auth.onAuthStateChange((_event, session) => {
  setUser(session?.user ?? null);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);