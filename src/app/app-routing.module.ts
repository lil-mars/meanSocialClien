import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'my-data', component: UserEditComponent
    },
    {
        path: 'people', component: UserListComponent
    },
    {
        path: 'timeline', component: TimelineComponent
    },
    {
        path: 'people/:page', component: UserListComponent
    },
    {
        path: '**', redirectTo: '/home'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
