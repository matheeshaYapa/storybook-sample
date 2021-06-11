import {TaskComponent} from './task.component';
import {moduleMetadata, Meta, Story} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {action} from '@storybook/addon-actions';

export default {
  component: TaskComponent,
  decorators: [
    moduleMetadata({
      declarations: [TaskComponent],
      imports: [CommonModule]
    })
  ],
  excludeStories: /.*Data$/,
  title: 'Task'
} as Meta;

export const actionsData = {
  pinTask: action('pinTask'),
  archiveTask: action('archiveTask')
};

const Template: Story<TaskComponent> = args => ({
  props: {
    ...args,
    pinTask: actionsData.pinTask,
    archiveTask: actionsData.archiveTask
  }
});

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date()
  }
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED'
  }
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED'
  }
};
