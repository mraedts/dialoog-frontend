import {createContext, useContext, useState } from 'react';

//provided by full stack niraj at https://www.youtube.com/watch?v=v2R0DFXqaF0

const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // provided by full stack niraj at https://www.youtube.com/watch?v=v2R0DFXqaF0
    return <LoginContext.Provider value={{isLoggedIn  , setIsLoggedIn}}>
        {children}
    </LoginContext.Provider>
}


export const useLogin = () => useContext(LoginContext);

export default LoginProvider;