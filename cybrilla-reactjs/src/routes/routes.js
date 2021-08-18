const routers = [
    {
        path: '/',
        redirect: '/auth'
    },
    {
        component: 'AuthLayout',
        path: '/auth',
        auth: false,
        exact: false,
        redirect: '/auth/login',
        childrens: [
            {
                component: 'Login',
                path: '/login',
                auth: false,
                exact: true
            }
        ]
    },
    {
        component: 'MainLayout',
        path: '/dashboard',
        auth: false,
        exact: false,
        childrens: [
            {
                component: 'Login',
                path: '/login',
                auth: false,
                exact: true
            }
        ]
    }
]

export default routers 