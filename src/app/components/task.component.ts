import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskModel} from '../models/task.model';

@Component({
  selector: 'app-task',
  template: `
    <div class="list-item {{task?.state}}">
      <label class="checkbox">
        <input type="checkbox" [defaultChecked]="task?.state === 'TASK_ARCHIVED'" disabled name="checked">
        <span class="checkbox-custom" (click)="onArchive(task.id)"></span>
      </label>

      <div class="title">
        <input type="text" [value]="task.title" readonly placeholder="Input Title">
      </div>

      <div class="actions">
        <a *ngIf="task?.state !== 'TASK_ARCHIVED'" (click)="onPin(task.id)">
          <span class="icon-star"></span>
        </a>
      </div>
    </div>
  `
})
export class TaskComponent {

  @Input() task: TaskModel;

  @Output() pinTask =  new EventEmitter<string>();
  @Output() archiveTask =  new EventEmitter<string>();

  onArchive(taskId: string): void {
    this.archiveTask.emit(taskId);
  }

  onPin(taskId: string): void {
    this.pinTask.emit(taskId);
  }

}
