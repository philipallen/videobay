// import { MyApp } from './app.component';
// import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// import { AuthService } from './shared/services/auth.service';
// import { AuthGuardService } from './shared/services/auth-guard.service';



export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePage },
    { path: 'list', component: ListPage}
    // { path: 'blog', component: BlogPage,
    //     children: [
    //       { path: '', redirectTo: 'frontend-essentials', pathMatch: 'full' },
    //       { path: 'angular-memory-leaks', component: Blog_AnglarMemory },
    //       { path: 'frontend-essentials', component: Blog_FrontendEssentials },
    //       { path: 'javascript-in-ie', component: Blog_JavascriptInIE },
    //       { path: 'angular-directive-scope', component: Blog_AngularDirectiveScope }
    //     ] 
    // }
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
//     exports: [RouterModule],
//     // providers: [AuthGuardService, AuthService]
// })
// export class AppRoutingModule { }

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });