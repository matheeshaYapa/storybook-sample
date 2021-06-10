import {render} from '@testing-library/angular';
import {TaskComponent} from './task.component';
import {WithPinnedTasks} from './pure-task-list.stories';
import {PureTaskListComponent} from './pure-task-list.component';

describe('TaskList component', () => {
  it('renders pinned tasks at the start of the list', async () => {
    const mockedActions = jest.fn();
    const tree = await render(PureTaskListComponent, {
      declarations: [TaskComponent],
      componentProperties: {
        ...WithPinnedTasks.args,
        pinTask: {
          emit: mockedActions
        } as any,
        archiveTask: {
          emit: mockedActions
        } as any
      }
    });

    const component = tree.fixture.componentInstance;
    expect(component.tasksInOrder[0].id).toBe('6');
  });
});
