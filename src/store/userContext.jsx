import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export function UserContextProvider({children}) {
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: "null",
        userInfo: {},
    }
    function ReducerFnc(state, action) {
        if(action.type === 'SWITCH_USER'){
            return {
                userInfo: action.payload,
                chatId: currentUser.uid > action.payload.uid ? (currentUser.uid + action.payload.uid) : (action.payload.uid + currentUser.uid)
            }
        }
        return state;
    }
    const [userState, dispatcherFn] = useReducer(ReducerFnc, INITIAL_STATE)
    return <UserContext.Provider value={{data: userState, dispatcherFn}}>{children}</UserContext.Provider>
}