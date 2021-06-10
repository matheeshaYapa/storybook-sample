import {TaskModel} from '../models/task.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';

export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK'
};

export class ArchiveTask {
  static readonly type = actions.ARCHIVE_TASK;

  constructor(public payload: string) {}
}

export class PinTask {
  static readonly type = actions.PIN_TASK;

  constructor(public payload: string) {}
}


const defaultTasks = {
  1: {id: '1', title: 'Something', state: 'TASK_INBOX'},
  2: {id: '2', title: 'Something more', state: 'TASK_INBOX'},
  3: {id: '3', title: 'Something else', state: 'TASK_INBOX'},
  4: {id: '4', title: 'Something else again', state: 'TASK_INBOX'},
  5: {id: '5', title: 'Something last', state: 'TASK_INBOX'}
};

export class TaskStateModel {
  entities: { [id: number]: TaskModel};
}

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    entities: defaultTasks
  }
})
export class TasksState {
  @Selector()
  static getAllTasks(state: TaskStateModel): any[] {
    const entities = state.entities;
    return Object.keys(entities).map(id => entities[id]);
  }

  @Action(PinTask)
  pinTask({patchState, getState}: StateContext<TaskStateModel>, {payload}: PinTask): void {
    const state = getState().entities;

    const entities = {
      ...state,
      [payload]: {...state[payload], state: 'TASK_PINNED'}
    };

    patchState({entities});
  }

  @Action(ArchiveTask)
  archiveTask({patchState, getState}: StateContext<TaskStateModel>, {payload}: ArchiveTask): void {
    const state = getState().entities;

    const entities = {
      ...state,
      [payload]: {...state[payload], state: 'TASK_ARCHIVED'}
    };

    patchState({entities});
  }
}
