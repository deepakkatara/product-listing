/* istanbul ignore file */
import type { Meta, StoryObj } from '@storybook/react';
import AppMultiSelectDropDown from './multiSelectdropDown';

const meta: Meta<typeof AppMultiSelectDropDown> = {
    title: 'Components/MultiSelectDropDown',
    component: AppMultiSelectDropDown,
};

export default meta;

type Story = StoryObj<typeof AppMultiSelectDropDown>;

export const Default: Story = {
    args: {
        label: 'Type',
        placeholder: 'Select Types',
        isOpen: false,
        data: [],
        onChangeHandler: () => { },
        onOpenHandler: () => { },
        onCloseHandler: () => { },
        onCleanHandler: () => { },
    },
};


