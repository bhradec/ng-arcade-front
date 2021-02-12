import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { AdministrationComponent } from './administration/administration.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { GameLibraryComponent } from './game-library/game-library.component';
import { GameProfileComponent } from './game-profile/game-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './shared/other/admin-guard';
import { AuthGuard } from './shared/other/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "", component: GameLibraryComponent, canActivate: [AuthGuard] },
            { path: "userProfile", component: UserProfileComponent, canActivate: [AuthGuard] },
            { path: "gameProfile", component: GameProfileComponent, canActivate: [AuthGuard] },
            { path: "gameAuthorProfile", component: GameProfileComponent, canActivate: [AuthGuard] },
            { path: "administration", component: AdministrationComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "addGame", component: AddGameComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "editGame/:id", component: EditGameComponent, canActivate: [AuthGuard, AdminGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
