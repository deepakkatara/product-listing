/* istanbul ignore file */
import type { Meta, StoryObj } from '@storybook/react';
import AppFilter from './filter';

const meta: Meta<typeof AppFilter> = {
    title: 'Components/Filter',
    component: AppFilter,
};

export default meta;

type Story = StoryObj<typeof AppFilter>;

export const Default: Story = {
    args: {
        isFilterEnable: () => { },
    },
};


