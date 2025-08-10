import type { Meta, StoryObj } from '@storybook/react';
import PokemonCard from './pokemonCard';

const meta: Meta<typeof PokemonCard> = {
    title: 'Components/PokemonCard',
    component: PokemonCard,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Basic: Story = {
    args: {
        className: '',
        data: {
            id: 1,
            name: 'bulbasaur',
            sprites: { other: { dream_world: { front_default: '' } }, front_default: '' },
            types: [{ type: { name: 'grass' } }],
        },
    },
};


