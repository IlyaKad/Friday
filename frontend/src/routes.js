import { Home } from './main-pages/Home.jsx'
import { Login } from './main-pages/Login.jsx'
import { Signup } from './main-pages/Signup.jsx'
import { BoardApp } from './Board/pages/BoardApp'
import { MemberProfile } from './main-pages/MemberProfile.jsx'
import { Chat } from './Board/cmps/Chat.jsx'

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login/',
        component: Login,
    },
    {
        path: '/signup/',
        component: Signup,
    },
    {
        path: '/user/:id',
        component: MemberProfile,
    },
    {
        path: '/board/:id?',
        component: BoardApp
    }
]