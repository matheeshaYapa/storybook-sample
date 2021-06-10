import {NgModule} from '@angular/core';
import {PureTaskListComponent} from './pure-task-list.component';
import {TaskListComponent} from './task-list.component';
import {TaskComponent} from './task.component';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {TasksState} from '../state/task.state';

@NgModule({
  declarations: [
    PureTaskListComponent,
    TaskListComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([TasksState])
  ],
  exports: [
    TaskComponent,
    TaskListComponent
  ]
})
export class TaskModule {
}
