import Home from './views/Home'
import Login from './views/User/Login'
import Contact from './views/Contact'
import User from './views/User/User'
import Registration from './views/User/Registration'
export const routes = [{
        path: '/',
        name: 'homepage',
        component: Home
    },
    {
        path: '/login',
        name: 'loginpage',
        component: Login
    },
    {
        path: '/contact',
        name: 'contactpage',
        component: Contact
    },
    {
        path: '/profile',
        name: 'profilepage',
        component: User
    },
    {
        path: '/registration',
        name: 'registrationpage',
        component: Registration
    }
]