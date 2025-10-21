// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../../components/common/Input';

describe('Input Component', () => {
    it('renders with label', () => {
        render(<Input label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
        render(<Input placeholder="Test placeholder" />);
        expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    it('shows error message when error prop is provided', () => {
        render(<Input error="Test error message" />);
        expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('shows required asterisk when required prop is true', () => {
        render(<Input label="Test Label" required />);
        expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test value' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('renders with icon when provided', () => {
        const icon = <span data-testid="test-icon">Icon</span>;
        render(<Input icon={icon} />);
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('applies correct size classes', () => {
        const { rerender } = render(<Input size="sm" />);
        let input = screen.getByRole('textbox');
        expect(input).toHaveClass('px-3');

        rerender(<Input size="lg" />);
        input = screen.getByRole('textbox');
        expect(input).toHaveClass('px-5');
    });
});
