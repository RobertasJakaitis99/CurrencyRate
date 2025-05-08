// src/context/index.tsx
import React, { createContext, useReducer, useEffect } from "react";

// ===== UI KONTEKSTAS =====

// UIState tipo apibrėžimas
export interface UIState {
  theme: "light" | "dark";
  language: "lt" | "en";
}

// UIAction tipo apibrėžimas
export type UIAction =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "SET_LANGUAGE"; payload: "lt" | "en" };

// uiReducer funkcija
const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

// UIContextProps tipo apibrėžimas
interface UIContextProps extends UIState {
  dispatch: React.Dispatch<UIAction>;
}

// UIContext sukūrimas
export const UIContext = createContext<UIContextProps>({
  theme: "light",
  language: "en",
  dispatch: () => null,
});

// UIProvider komponentas
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(uiReducer, {
    theme: "light",
    language: "en",
  });

  // Gaunam iš localStorage ir nustatom tiksliai
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");
    if (savedTheme === "light" || savedTheme === "dark") {
      dispatch({ type: "SET_THEME", payload: savedTheme });
    }
    if (savedLanguage === "lt" || savedLanguage === "en") {
      dispatch({ type: "SET_LANGUAGE", payload: savedLanguage });
    }
  }, []);

  // Įrašom į localStorage kai pasikeičia
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    localStorage.setItem("language", state.language);
  }, [state.theme, state.language]);

  return (
    <UIContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};

// ===== AUTH KONTEKSTAS =====

// User tipo apibrėžimas
export interface User {
  _id: string;
  email: string;
  role: "user" | "admin";
  name?: string;
  surname?: string;
}

// AuthState tipo apibrėžimas
export interface AuthState {
  user: User | null;
  token: string | null;
}

// AuthAction tipo apibrėžimas
export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" };

// authReducer funkcija
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

// AuthContextProps tipo apibrėžimas
interface AuthContextProps extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

// AuthContext sukūrimas
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  dispatch: () => null,
});

// AuthProvider komponentas
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });

  // Gaunam iš localStorage kai komponentas užsikrauna
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        dispatch({
          type: "LOGIN",
          payload: {
            user,
            token: savedToken,
          },
        });
      } catch (error) {
        // Jei nepavyko parsinai JSON, išvalome localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Įrašom į localStorage kai pasikeičia
  useEffect(() => {
    if (state.token && state.user) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state.token, state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Kombinuotas provider
// ===============================

// Komponentas, kuris sujungia abu providerius
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <UIProvider>{children}</UIProvider>
    </AuthProvider>
  );
};
