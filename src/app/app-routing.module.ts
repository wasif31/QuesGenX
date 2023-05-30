import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from "./users/user-list/user-list.component";
import {LayoutComponent} from "./shared/layout/layout.component";

const appRoutes: Routes = [
    {
        path: '',
        component:LayoutComponent
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
