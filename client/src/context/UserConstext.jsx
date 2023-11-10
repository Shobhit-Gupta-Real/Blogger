import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const UserContext = createContext({
    
})

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState({})
    return(
        <UserContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}
//you ensure that the children components can access the context 
// here the use of children is that it children parameter is a special property that is used in React when 
// you define a component that wraps other components or elements. In this case, the UserContextProvider 
// component is designed to be a higher-order component that can wrap other components, allowing them to
//  access the context provided by UserContext.