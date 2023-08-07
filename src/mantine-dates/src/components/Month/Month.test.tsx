import React from 'react';
import { tests, render } from '@mantine/tests';
import { Month, MonthProps, MonthStylesNames } from './Month';

const defaultProps: MonthProps = {
  month: new Date(2022, 3, 2),
};

describe('@mantine/core/Month', () => {
  tests.itSupportsSystemProps<MonthProps, MonthStylesNames>({
    component: Month,
    props: defaultProps,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLTableElement,
    displayName: '@mantine/dates/Month',
    stylesApiSelectors: ['month'],
  });

  tests.dates.itSupportsOnDayClick({ component: Month, props: defaultProps });
  tests.dates.itSupportsOnDayKeydown({ component: Month, props: defaultProps });
  tests.dates.itSupportsGetDayRef({ component: Month, props: defaultProps });
  tests.dates.itSupportsMonthProps({ component: Month, props: defaultProps });

  it('has correct default __staticSelector', () => {
    const { container } = render(<Month {...defaultProps} />);
    expect(container.querySelector('table')).toHaveClass('mantine-Month-month');
    expect(container.querySelector('thead tr')).toHaveClass('mantine-Month-weekdaysRow');
    expect(container.querySelector('tbody tr td button')).toHaveClass('mantine-Month-day');
  });

  it('supports __staticSelector', () => {
    const { container } = render(<Month {...defaultProps} __staticSelector="Calendar" />);
    expect(container.querySelector('table')).toHaveClass('mantine-Calendar-month');
    expect(container.querySelector('thead tr')).toHaveClass('mantine-Calendar-weekdaysRow');
    expect(container.querySelector('tbody tr td button')).toHaveClass('mantine-Calendar-day');
  });

  it('supports static prop', () => {
    const { container, rerender } = render(<Month {...defaultProps} />);
    expect((container.querySelector('td')!.firstChild as HTMLElement).tagName).toBe('BUTTON');

    rerender(<Month {...defaultProps} static />);
    expect((container.querySelector('td')!.firstChild as HTMLElement).tagName).toBe('DIV');
  });
});
