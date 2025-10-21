// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../components/common/Button';

describe('Button Component', () => {
    it('renders with children', () => {
        render(<Button>Test Button</Button>);
        expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('applies correct variant classes', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        let button = screen.getByRole('button');
        expect(button).toHaveClass('bg-blue-600');

        rerender(<Button variant="secondary">Secondary</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('bg-slate-100');

        rerender(<Button variant="danger">Danger</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('bg-red-600');
    });

    it('applies correct size classes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        let button = screen.getByRole('button');
        expect(button).toHaveClass('px-3');

        rerender(<Button size="lg">Large</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('px-6');
    });

    it('shows loading state', () => {
        render(<Button loading>Loading Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('opacity-50');
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders with left and right icons', () => {
        const leftIcon = <span data-testid="left-icon">Left</span>;
        const rightIcon = <span data-testid="right-icon">Right</span>;

        render(
            <Button leftIcon={leftIcon} rightIcon={rightIcon}>
                With Icons
            </Button>
        );

        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
});
