import { createContext, useState} from 'react'

interface UserContext{
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}

interface User{
    usertoken:string,
    username:string,
    loggedIn:boolean
}

export const UserAuthContext = createContext<UserContext>({} as UserContext)

export default function UserProvider({children}:{children: JSX.Element | JSX.Element[]}){

    const [user, setUser] = useState<User>({usertoken:'',username:'',loggedIn:false})

    const uservalue = {
        user,
        setUser
    }
    return <UserAuthContext.Provider value ={uservalue}>{children}</UserAuthContext.Provider>
}