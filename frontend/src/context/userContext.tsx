import { createContext, useCallback, useState } from 'react';

// set context type
type UserContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  emailCtx: string|null;
  setEmail: (email: string) => void;
};

// context default value
const defaultContext: UserContext = {
  isLoggedIn: false,
  // 初期値を作成するが、eslintに引っかかる
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoggedIn: () => {},
  emailCtx: null,
  setEmail: () => {}
};

// context object
export const userContext = createContext<UserContext>(defaultContext);

// custom Hook
export const useUserLogin = (children)=> {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailCtx, setEmail] = useState<string|null>(null);
  // const setIsLoggedIn = useCallback((current: boolean): void => {setLoggedIn(current);
  // }, []);


  const value = {
    isLoggedIn,
    setIsLoggedIn,
    emailCtx,
    setEmail,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};