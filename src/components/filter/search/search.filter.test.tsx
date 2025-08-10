import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilter from './search.filter';

describe('SearchFilter', () => {
    it('renders label and calls onChange', () => {
        const onChange = jest.fn();
        render(
            <SearchFilter
                placeholder="Name or Number"
                inputClass="cls"
                label="Search By"
                onChangeHandler={onChange}
            />
        );
        expect(screen.getByText(/Search By/i)).toBeInTheDocument();
        const input = screen.getByPlaceholderText(/Name or Number/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'pikachu' } });
    });
});


