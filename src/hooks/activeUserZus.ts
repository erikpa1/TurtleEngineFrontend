import create from "zustand";
import User from "@data/users/User";
import {Project} from "@data/project/Project";


export default class ActiveUserSingleton {
    static I = new User()
}

interface ActiveUserZus {
    user: User | null
    setActiveUser: (user: User | null) => void
}


export const useActiveUser = create<ActiveUserZus>((set) => ({
    user: null,
    setActiveUser: (newUser: User | null) => set((oldState) => {

        if (newUser) {
            ActiveUserSingleton.I = newUser
        } else {
            ActiveUserSingleton.I = new User()
        }


        return {
            user: newUser
        }
    }),
}))

