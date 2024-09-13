import {composeStory} from '@storybook/react';
import userEvent from '@testing-library/user-event';
import {render, screen} from 'test/rtl';
import {describe, expect, test} from 'vitest';
import Meta, {Default} from './index.stories';

const Radio = composeStory(Default, Meta);

describe('Radio', () => {
  test('clickable', async () => {
    const {click} = userEvent.setup();

    render(<Radio />);

    const RadioLocoMoco = screen.getByRole('radio', {
      name: /hawaii-locomoco/i,
    });
    expect(RadioLocoMoco).toBeInTheDocument();
    expect(RadioLocoMoco).not.toBeChecked();

    const RadioPoke = screen.getByRole('radio', {name: /poke/i});
    expect(RadioPoke).toBeInTheDocument();
    expect(RadioLocoMoco).not.toBeChecked();

    await click(RadioPoke);
    expect(RadioPoke).toBeChecked();
    expect(RadioLocoMoco).not.toBeChecked();

    await click(RadioLocoMoco);
    expect(RadioLocoMoco).toBeChecked();
    expect(RadioPoke).not.toBeChecked();
  });

  test('cannot click disabled', async () => {
    const {click} = userEvent.setup();

    render(<Radio />);

    const RadioCheese = screen.getByRole('radio', {name: /cheese/i});
    expect(RadioCheese).toBeInTheDocument();
    expect(RadioCheese).not.toBeChecked();

    await click(RadioCheese);
    expect(RadioCheese).not.toBeChecked();
  });
});
