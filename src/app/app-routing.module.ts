import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameProfileComponent } from './game-profile/game-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/other/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'gameProfile', component: GameProfileComponent, canActivate: [AuthGuard] },
    { path: 'gameAuthorProfile', component: GameProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }