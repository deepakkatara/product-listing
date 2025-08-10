import type { Meta, StoryObj } from '@storybook/react';
import PropertyCard from './propertyCard';

const meta: Meta<typeof PropertyCard> = {
    title: 'Components/PropertyCard',
    component: PropertyCard,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PropertyCard>;

export const Default: Story = {
    args: {
        data: { height: 7, weight: 69, abilities: [], types: [] },
        speciesData: { egg_groups: [] },
        pokemonTypeData: { damage_relations: { double_damage_from: [] } },
    },
};


