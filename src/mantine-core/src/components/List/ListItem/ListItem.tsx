import React from 'react';
import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useProps,
  Factory,
} from '../../../core';
import { useListContext } from '../List.context';
import classes from '../List.module.css';

export type ListItemStylesNames = 'item' | 'itemWrapper' | 'itemIcon' | 'itemLabel';

export interface ListItemProps
  extends BoxProps,
    StylesApiProps<ListItemFactory>,
    ElementProps<'li'> {
  /** Icon to replace item bullet */
  icon?: React.ReactNode;

  /** Item content */
  children?: React.ReactNode;
}

export type ListItemFactory = Factory<{
  props: ListItemProps;
  ref: HTMLLIElement;
  stylesNames: ListItemStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ListItemProps> = {};

export const ListItem = factory<ListItemFactory>((_props, ref) => {
  const props = useProps('ListItem', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, icon, children, ...others } = props;

  const ctx = useListContext();
  const _icon = icon || ctx.icon;
  const stylesApiProps = { classNames, styles };

  return (
    <Box
      {...ctx.getStyles('item', { ...stylesApiProps, className, style })}
      component="li"
      mod={{ 'with-icon': !!_icon, centered: ctx.center }}
      ref={ref}
      {...others}
    >
      <div {...ctx.getStyles('itemWrapper', stylesApiProps)}>
        {_icon && <span {...ctx.getStyles('itemIcon', stylesApiProps)}>{_icon}</span>}
        <span {...ctx.getStyles('itemLabel', stylesApiProps)}>{children}</span>
      </div>
    </Box>
  );
});

ListItem.classes = classes;
ListItem.displayName = '@mantine/core/ListItem';
