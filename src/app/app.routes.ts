import { Routes } from '@angular/router';
import { Create } from './create/create';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    // { path: "", component: Home, canActivate: [authGuard] },
    // { path: "create", component: Create, canActivate: [authGuard] },
    // { path: "create/:id", component: Create, canActivate: [authGuard] },
    // { path: 'login', component: Login,  },
    // { path: 'register', component: Register },
    // { path: '', redirectTo: 'login', pathMatch: 'full' },

    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'create', component: Create, canActivate: [authGuard] },
    { path: 'create/:id', component: Create, canActivate: [authGuard] },

    {
        path: ':city',
        children: [
            { path: 'login', component: Login },
            { path: 'register', component: Register },

            { path: '', component: Home, canActivate: [authGuard] },
            { path: 'create', component: Create, canActivate: [authGuard] },
            { path: 'create/:id', component: Create, canActivate: [authGuard] }
        ]
    },

    { path: '**', component: PageNotFound }
];
