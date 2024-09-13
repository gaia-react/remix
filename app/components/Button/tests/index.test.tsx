import userEvent from '@testing-library/user-event';
import {render, screen} from 'test/rtl';
import {describe, expect, test, vi} from 'vitest';
import Button from '../index';

describe('Button', () => {
  test('Active', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);
    const button = screen.getByRole('button');
    expect(button?.textContent).toBe('Test');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('Disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled={true} onClick={onClick}>
        Test
      </Button>
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('Loading', () => {
    const onClick = vi.fn();
    render(
      <Button isLoading={true} onClick={onClick}>
        Test
      </Button>
    );
    const loader = screen.getByRole('progressbar');
    expect(loader).toBeInTheDocument();
  });
});
