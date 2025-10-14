import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Project } from './project/project';
import { SettingsComponent } from './side-panel/settings/settings';
import { CreateUserComponent } from './side-panel/settings/create-user/create-user';
import { Dashboard } from './side-panel/dashboard/dashboard';
import { ProjectsGrid } from './side-panel/projects-grid/projects-grid';
import { ProjectsDetails } from './side-panel/projects-details/projects-details';
import { UserList } from './side-panel/settings/user-list/user-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard },
  { path: 'projects', component: ProjectsGrid },
  { path: 'project', component: Project },
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/create-user', component: CreateUserComponent },  // flat route
  { path: 'projects/:id', component: ProjectsDetails },
  { path: 'projects/create', component: Project },
  { path: 'projects/edit/:id', component: Project },
  { path: 'users', component: UserList },
  { path: 'users/edit/:id', component: CreateUserComponent } ,

  { path: '**', redirectTo: 'login' }
];
