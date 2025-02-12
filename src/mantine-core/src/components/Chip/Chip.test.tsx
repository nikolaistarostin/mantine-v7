import React from 'react';
import { render, tests } from '@mantine/tests';
import { Chip, ChipProps, ChipStylesNames } from './Chip';

const defaultProps: ChipProps = {
  value: 'test-value',
  children: 'test-chip',
  checked: true,
};

describe('@mantine/core/Chip', () => {
  tests.axe([<Chip {...defaultProps} />]);

  tests.itSupportsSystemProps<ChipProps, ChipStylesNames>({
    component: Chip,
    props: defaultProps,
    styleProps: true,
    children: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLInputElement,
    displayName: '@mantine/core/Chip',
    stylesApiSelectors: ['root', 'iconWrapper', 'checkIcon', 'input', 'label'],
  });

  tests.itSupportsFocusEvents({
    component: Chip,
    props: defaultProps,
    selector: 'input',
  });

  it('displays check icon when checked prop is true', () => {
    const { rerender, container } = render(<Chip {...defaultProps} checked />);
    expect(container.querySelectorAll('.mantine-Chip-checkIcon')).toHaveLength(1);

    rerender(<Chip {...defaultProps} checked={false} />);
    expect(container.querySelectorAll('.mantine-Chip-checkIcon')).toHaveLength(0);
  });
});
