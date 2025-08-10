import React from 'react';
import { render, screen } from '@testing-library/react';
import AppMultiSelectDropDown from './multiSelectdropDown';

test('renders dropdown label', () => {
    render(
        <AppMultiSelectDropDown
            label="Type"
            placeholder="Select Types"
            isOpen={false}
            data={[]}
            onChangeHandler={jest.fn()}
            onOpenHandler={jest.fn()}
            onCloseHandler={jest.fn()}
        />
    );
    expect(screen.getByText(/^Type$/i)).toBeInTheDocument();
});


