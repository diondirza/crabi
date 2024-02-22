import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';

describe('<ThemeProvider />', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <div>Children</div>
      </ThemeProvider>,
    );

    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
