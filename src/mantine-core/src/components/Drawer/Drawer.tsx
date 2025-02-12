import React from 'react';
import { factory, useProps, Factory, getDefaultZIndex } from '../../core';
import { ModalBaseOverlayProps, ModalBaseCloseButtonProps } from '../ModalBase';
import {
  DrawerRoot,
  DrawerRootProps,
  DrawerRootCssVariables,
  DrawerRootStylesNames,
} from './DrawerRoot';
import { DrawerBody } from './DrawerBody';
import { DrawerCloseButton } from './DrawerCloseButton';
import { DrawerOverlay } from './DrawerOverlay';
import { DrawerContent } from './DrawerContent';
import { DrawerTitle } from './DrawerTitle';
import { DrawerHeader } from './DrawerHeader';
import classes from './Drawer.module.css';

export type DrawerStylesNames = DrawerRootStylesNames;
export type DrawerCssVariables = DrawerRootCssVariables;

export interface DrawerProps extends DrawerRootProps {
  /** Drawer title */
  title?: React.ReactNode;

  /** Determines whether the overlay should be rendered, `true` by default */
  withOverlay?: boolean;

  /** Props passed down to the `Overlay` component, can be used to configure opacity, `background-color`, styles and other properties */
  overlayProps?: ModalBaseOverlayProps;

  /** Drawer content */
  children?: React.ReactNode;

  /** Determines whether the close button should be rendered, `true` by default */
  withCloseButton?: boolean;

  /** Props passed down to the close button */
  closeButtonProps?: ModalBaseCloseButtonProps;
}

export type DrawerFactory = Factory<{
  props: DrawerProps;
  ref: HTMLDivElement;
  stylesNames: DrawerStylesNames;
  vars: DrawerCssVariables;
  staticComponents: {
    Root: typeof DrawerRoot;
    Overlay: typeof DrawerOverlay;
    Content: typeof DrawerContent;
    Body: typeof DrawerBody;
    Header: typeof DrawerHeader;
    Title: typeof DrawerTitle;
    CloseButton: typeof DrawerCloseButton;
  };
}>;

const defaultProps: Partial<DrawerProps> = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex('modal'),
  padding: 'md',
  size: 'md',
  shadow: 'xl',
  withOverlay: true,
  withCloseButton: true,
};

export const Drawer = factory<DrawerFactory>((_props, ref) => {
  const {
    title,
    withOverlay,
    overlayProps,
    withCloseButton,
    closeButtonProps,
    children,
    ...others
  } = useProps('Drawer', defaultProps, _props);

  const hasHeader = !!title || withCloseButton;

  return (
    <DrawerRoot ref={ref} {...others}>
      {withOverlay && <DrawerOverlay {...overlayProps} />}
      <DrawerContent>
        {hasHeader && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {withCloseButton && <DrawerCloseButton {...closeButtonProps} />}
          </DrawerHeader>
        )}

        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
});

Drawer.classes = classes;
Drawer.displayName = '@mantine/core/Drawer';
Drawer.Root = DrawerRoot;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.CloseButton = DrawerCloseButton;
