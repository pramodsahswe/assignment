import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Globals } from './services/globals';
import { SidenavOverviewExampleComponent } from './sidenav-overview-example/sidenav-overview-example.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HttpModule } from '@angular/http';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

//services
import { UserService } from './services/user/user.service';
//Home component
import { HomeComponent } from './components/home/home.component';

//User component
import { UserListComponent } from './components/user/list/user-list.component';
import { UserAddComponent } from './components/user/add/user-add.component';
import { UserDetailsComponent } from './components/user/details/user-details.component';

//Task component
import { TaskListComponent } from './components/task/list/task-list.component';
import { TaskAddComponent } from './components/task/add/task-add.component';
import { TaskDetailsComponent } from './components/task/details/task-details.component';
//Dashboard component
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermissionsComponent } from './components/permissions/permissions.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavOverviewExampleComponent,
    AboutComponent,
    NotfoundComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    UserAddComponent,
    UserDetailsComponent,
    TaskAddComponent,
    TaskDetailsComponent,
    TaskListComponent,
    DashboardComponent,
    PermissionsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    Globals
    //UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
