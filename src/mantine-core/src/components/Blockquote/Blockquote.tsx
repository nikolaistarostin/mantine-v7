import React from 'react';
import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useProps,
  useStyles,
  createVarsResolver,
  Factory,
  MantineColor,
  getThemeColor,
  parseThemeColor,
  rgba,
  rem,
  MantineRadius,
  getRadius,
} from '../../core';
import classes from './Blockquote.module.css';

export type BlockquoteStylesNames = 'root' | 'icon';
export type BlockquoteVariant = string;
export type BlockquoteCssVariables = {
  root: '--bq-bg-light' | '--bq-bg-dark' | '--bq-bd' | '--bq-icon-size' | '--bq-radius';
};

export interface BlockquoteProps
  extends BoxProps,
    StylesApiProps<BlockquoteFactory>,
    ElementProps<'blockquote'> {
  /** Blockquote icon, displayed on the top left */
  icon?: React.ReactNode;

  /** Controls icon width and height, numbers are converted to rem (`1rem = 16px`), `40` by default */
  iconSize?: number | string;

  /** Key of `theme.colors` or any valid CSS color, `theme.primaryColor` by default */
  color?: MantineColor;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: MantineRadius | (string & {}) | number;
}

export type BlockquoteFactory = Factory<{
  props: BlockquoteProps;
  ref: HTMLQuoteElement;
  stylesNames: BlockquoteStylesNames;
  vars: BlockquoteCssVariables;
  variant: BlockquoteVariant;
}>;

const defaultProps: Partial<BlockquoteProps> = {
  iconSize: 48,
};

const varsResolver = createVarsResolver<BlockquoteFactory>((theme, { color, iconSize, radius }) => {
  const darkParsed = parseThemeColor({
    color: color || theme.primaryColor,
    theme,
    colorScheme: 'dark',
  });

  const lightParsed = parseThemeColor({
    color: color || theme.primaryColor,
    theme,
    colorScheme: 'light',
  });

  return {
    root: {
      '--bq-bg-light': rgba(lightParsed.value, 0.07),
      '--bq-bg-dark': rgba(darkParsed.value, 0.12),
      '--bq-bd': getThemeColor(color, theme),
      '--bq-icon-size': rem(iconSize),
      '--bq-radius': getRadius(radius),
    },
  };
});

export const Blockquote = factory<BlockquoteFactory>((_props, ref) => {
  const props = useProps('Blockquote', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    icon,
    iconSize,
    ...others
  } = props;

  const getStyles = useStyles<BlockquoteFactory>({
    name: 'Blockquote',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  return (
    <Box component="blockquote" ref={ref} {...getStyles('root')} {...others}>
      {icon && <span {...getStyles('icon')}>{icon}</span>}
      {children}
    </Box>
  );
});

Blockquote.displayName = '@mantine/core/Blockquote';
