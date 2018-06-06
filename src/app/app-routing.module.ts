import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';


import { UserListComponent } from './components/user/list/user-list.component';
import { UserAddComponent } from './components/user/add/user-add.component';
import { UserDetailsComponent } from './components/user/details/user-details.component';

import { TaskListComponent } from './components/task/list/task-list.component';
import { TaskAddComponent } from './components/task/add/task-add.component';
import { TaskDetailsComponent } from './components/task/details/task-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermissionsComponent } from './components/permissions/permissions.component';

const routes: Routes = [

//  {path:'user', component:UserComponent},
   {path:'register', component:RegisterComponent},
   {path:'about', component:AboutComponent},
   {path:'contact', component:ContactComponent},
   {path:'login', component:LoginComponent},
   {path:'user/list', component:UserListComponent},
   {path:'user/add', component:UserAddComponent},
   {path:'user/detail/', component:UserDetailsComponent},

   {path:'task/list', component:TaskListComponent},
   {path:'task/add/:taskId', component:TaskAddComponent},
   {path:'task/detail/:taskId', component:TaskDetailsComponent},
   {path:'permissions', component:PermissionsComponent},
   
   {path:'', component:DashboardComponent},
   {path: '404', component: NotfoundComponent },
   {path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
