import {Dashboard} from './dashboard/dashboard';

export const ROUTES = [
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '*',
        component: Dashboard
    }
] 