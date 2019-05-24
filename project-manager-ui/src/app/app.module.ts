import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { TaskAddComponent } from './task/task-add/task-add.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskViewComponent } from './task/task-view/task-view.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserViewComponent } from './user/user-view/user-view.component';

const routes : Routes = [
  { path: '', redirectTo: '/viewTask', pathMatch: 'full' },
  { path: 'viewTask', component: TaskViewComponent},
  { path: 'addTask', component: TaskAddComponent},
  { path: 'editTask/:id', component: TaskEditComponent},
  { path: 'addProject', component: ProjectAddComponent},
  { path: 'addUser', component: UserAddComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    TaskAddComponent,
    TaskEditComponent,
    TaskViewComponent,
    UserAddComponent,
    UserEditComponent,
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
