/* istanbul ignore file */
import type { Meta, StoryObj } from '@storybook/react';
import DetailsHeader from './detailsHeader';

const meta: Meta<typeof DetailsHeader> = {
    title: 'Components/DetailsHeader',
    component: DetailsHeader,
};

export default meta;

type Story = StoryObj<typeof DetailsHeader>;

export const Default: Story = {
    args: {
        data: { id: 1, name: 'bulbasaur' },
        speciesData: { flavor_text_entries: [] },
        backClick: () => { },
        closeClick: () => { },
        forwordClick: () => { },
    },
};


