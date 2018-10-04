import * as React from 'react'

export interface IRibbonComponentProps {

    /**
     * Whether ribbon is small
     */
    small?: boolean

    /**
     * Label
     */
    label: string

    /**
     * Icon
     */
    icon?:  JSX.Element

    /**
     * Ribbon color
     */
    className?: any

    /**
     * Styles
     */
    classes?: any

}
