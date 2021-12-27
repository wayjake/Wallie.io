export { default as SimpleIcon } from './SimpleIcon'

export enum Styles {
    'default',
    'warning',
    'info',
}

export type SimpleIconProps = {
    content: string
    hoverContent: string
    style: Styles
}

export const stylesColors = {
    [Styles.default]: 'inherit',
    [Styles.warning]: 'red',
    [Styles.info]: 'yellow',
}
