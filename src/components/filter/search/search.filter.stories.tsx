/* istanbul ignore file */
import type { Meta, StoryObj } from '@storybook/react';
import SearchFilter from './search.filter';

const meta: Meta<typeof SearchFilter> = {
    title: 'Components/SearchFilter',
    component: SearchFilter,
};

export default meta;

type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
    args: {
        placeholder: 'Search by name or number',
        inputClass: 'input',
        label: 'Search By',
        onChangeHandler: () => { },
    },
};


