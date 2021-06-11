import {Component} from '@angular/core';
import {TaskModel} from '../models/task.model';
import {Select, Store} from '@ngxs/store';
import {ArchiveTask, PinTask, TasksState, UnArchiveTask} from '../state/task.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-list',
  template: `
    <app-pure-task-list
      [tasks]="tasks$ | async"
      (pinTask)="pinTask($event)"
      (archiveTask)="archiveTask($event)"
      (unArchiveTask)="unArchiveTask($event)"
    ></app-pure-task-list>
  `
})
export class TaskListComponent {

  @Select(TasksState.getAllTasks) tasks$: Observable<TaskModel[]>;

  constructor(private store: Store) {
  }

  archiveTask(id: string): void {
    this.store.dispatch(new ArchiveTask(id));
  }

  unArchiveTask(id: string): void {
    this.store.dispatch(new UnArchiveTask(id));
  }

  pinTask(id: string): void {
    this.store.dispatch(new PinTask(id));
  }

}
