import type { Meta, StoryObj } from '@storybook/react';
import Apploader from './loader';

const meta: Meta<typeof Apploader> = {
    title: 'Components/Apploader',
    component: Apploader,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Apploader>;

export const Default: Story = {
    args: {
        className: 'app-loader-wrapper',
    },
};


