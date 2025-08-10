import type { Meta, StoryObj } from '@storybook/react';
import StatCard from './statCard';

const meta: Meta<typeof StatCard> = {
    title: 'Components/StatCard',
    component: StatCard,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
    args: {
        stats: [
            { stat: { name: 'hp' }, base_stat: 45 },
            { stat: { name: 'attack' }, base_stat: 49 },
        ],
    },
};


