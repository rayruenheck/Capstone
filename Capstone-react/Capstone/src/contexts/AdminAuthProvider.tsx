import { createContext, useState} from 'react'

interface AdminContext{
    admin: Admin,
    setAdmin: React.Dispatch<React.SetStateAction<Admin>>
}

interface Admin{
    token:string,
    adminname:string,
    loggedIn:boolean
}

export const AdminAuthContext = createContext<AdminContext>({} as AdminContext)

export default function AdminProvider({children}:{children: JSX.Element | JSX.Element[]}){

    const [admin, setAdmin] = useState<Admin>({token:'',adminname:'',loggedIn:false})

    const value = {
        admin,
        setAdmin
    }
    return <AdminAuthContext.Provider value ={value}>{children}</AdminAuthContext.Provider>
}