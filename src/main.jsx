import React from "react";
import ReactDOM from "react-dom/client";

import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./auth/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "./components/CartContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <AuthProvider>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AppRoutes />
                <Toaster visibleToasts={1} position="top-right" richColors />
              </ThemeProvider>
            </AuthProvider>
          </CartProvider>
        </QueryClientProvider>
      </Router>
    </React.StrictMode>
  );
}