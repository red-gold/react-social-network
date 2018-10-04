import { FormikValues, FormikTouched } from 'formik'

export interface ICreateSelectFormProps  {

    /**
     * Styles
     */
    classes?: any

    /**
     * Handle on change
     */
    onChange: (field: string, value: any) => void

    /**
     * Handle on blur
     */
    onBlur: (field: string, isTouched?: boolean) => void

    /**
     * Input value
     */
    value: any

    /**
     * Whether is error
     */
    error?: boolean

    /**
     * Whether input is full with
     */
    fullWidth?: boolean

    /**
     * Whether is touched
     */
    touched?: FormikTouched<FormikValues>

    /**
     * Select options
     */
    options: {label: string, value: string}[]
}
