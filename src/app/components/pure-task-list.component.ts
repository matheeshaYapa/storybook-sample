import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TaskModel} from '../models/task.model';

@Component({
  selector: 'app-pure-task-list',
  template: `
    <div class="list-items">
      <app-task *ngFor="let task of tasksInOrder"
                (archiveTask)="archiveTask.emit($event)"
                (unArchiveTask)="unArchiveTask.emit($event)"
                (pinTask)="pinTask.emit($event)"
                [task]="task">
      </app-task>

      <div *ngIf="!loading && tasksInOrder?.length === 0" class="wrapper-message">
        <span class="icon-check"></span>
        <div class="title-message">You have No tasks</div>
        <div class="subtitle-message">Sit back and relax</div>
      </div>

      <div *ngIf="loading">
        <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="loading-item">
          <span class="glow-checkbox"></span>
          <span class="glow-text">
            <span>Loading</span><span>Cool</span><span>state</span>
          </span>
        </div>
      </div>
    </div>
  `
})
export class PureTaskListComponent {

  @Input() loading = false;

  @Output() pinTask = new EventEmitter<string>();
  @Output() archiveTask = new EventEmitter<string>();
  @Output() unArchiveTask = new EventEmitter<string>();

  tasksInOrder = new Array<TaskModel>();

  @Input() set tasks(arr: Array<TaskModel>) {
    this.tasksInOrder = [
      ...arr.filter(t => t.state === 'TASK_PINNED'),
      ...arr.filter(t => t.state !== 'TASK_PINNED')
    ];
  }

}
