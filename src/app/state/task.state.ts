import {TaskModel} from '../models/task.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';

export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  UN_ARCHIVE_TASK: 'UN_ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
  ERROR: 'APP_ERROR'
};

export class ArchiveTask {
  static readonly type = actions.ARCHIVE_TASK;

  constructor(public payload: string) {}
}

export class UnArchiveTask {
  static readonly type = actions.UN_ARCHIVE_TASK;

  constructor(public payload: string) {}
}

export class PinTask {
  static readonly type = actions.PIN_TASK;

  constructor(public payload: string) {}
}

export class AppError {
  static readonly type = actions.ERROR;

  constructor(public payload: boolean) {}
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
  error: boolean;
}

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    entities: defaultTasks,
    error: false
  }
})
export class TasksState {
  @Selector()
  static getAllTasks(state: TaskStateModel): any[] {
    const entities = state.entities;
    return Object.keys(entities).map(id => entities[id]);
  }

  @Selector()
  static getError(state: TaskStateModel): boolean {
    const {error} = state;
    return error;
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

  @Action(UnArchiveTask)
  unArchiveTask({patchState, getState}: StateContext<TaskStateModel>, {payload}: UnArchiveTask): void {
    const state = getState().entities;

    const entities = {
      ...state,
      [payload]: {...state[payload], state: 'TASK_INBOX'}
    };

    patchState({entities});
  }

  @Action(AppError)
  setAppError({patchState, getState}: StateContext<TaskStateModel>, {payload}: AppError): void {
    const state = getState();

    patchState({
      error: !state.error
    });
  }

}
