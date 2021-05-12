import Home from './components/Home'
import Login from './components/User/Login'
import Contact from './components/Contact'
import User from './components/User/User'
import Registration from './components/User/Registration'
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