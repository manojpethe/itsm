import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Testlab from './Testlab';

describe('Testlab', () => {
  it('renders component with xyz as text', () => {
    render(<Testlab />);
    expect(screen.getByText('xyz')).toBeDefined()
  });
});