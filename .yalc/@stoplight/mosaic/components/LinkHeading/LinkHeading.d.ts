import './style.css';
import React from 'react';
import { BoxProps } from '../Box';
import { HeadingAs, HeadingOwnProps } from '../Heading';
export declare type LinkHeadingOwnProps = HeadingOwnProps & {
    id?: string;
};
export declare type LinkHeadingProps = LinkHeadingOwnProps & BoxProps<HeadingAs>;
export declare const LinkHeading: React.NamedExoticComponent<HeadingOwnProps & {
    id?: string;
} & import("../..").ITypographyProps & import("../..").ISizeProps & import("../..").IMarginProps & import("../..").IPaddingProps & import("../..").IShadowProps & import("../..").IColorProps & import("../..").IBorderProps & import("../..").IRingProps & import("../..").IInteractivityProps & import("../..").IFlexProps & import("../..").IPositionProps & import("../..").ILayoutProps & {
    as?: HeadingAs;
    className?: string;
    role?: string;
    noFocusRing?: boolean;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, keyof import("../..").ITypographyProps | keyof import("../..").ISizeProps | keyof import("../..").IMarginProps | keyof import("../..").IPaddingProps | "boxShadow" | keyof import("../..").IColorProps | keyof import("../..").IBorderProps | keyof import("../..").IRingProps | keyof import("../..").IInteractivityProps | keyof import("../..").IFlexProps | keyof import("../..").IPositionProps | keyof import("../..").ILayoutProps | "as" | "className" | "role" | "noFocusRing">>;
