export { default as SimpleIcon } from './SimpleIcon'
export { default as Button } from './Button'
export { default as FormItem } from './FormItem'
export { default as Input } from './Input'
export { default as Label } from './Label'
export { default as Textarea } from './Textarea'

export enum Styles {
    'default',
    'warning',
    'info',
    'positive',
}

export type SimpleIconProps = {
    content: string
    hoverContent: string
    style: Styles
    className: string
    showBorder?: boolean
    // onClick: () => void
    onClick: (event: any) => void
}

export const stylesColors = {
    [Styles.default]: 'inherit',
    [Styles.warning]: 'red',
    [Styles.info]: 'yellow',
    [Styles.positive]: 'green',
}
