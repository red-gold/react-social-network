import { InputProps } from '@material-ui/core/Input'

export interface ISelectProps extends InputProps  {

    /**
     * Styles
     */
    classes?: any

    /**
     * Select options
     */
    options: {label: string, value: string}[]

    /**
     * Helper text
     */
    helper?: string
}
