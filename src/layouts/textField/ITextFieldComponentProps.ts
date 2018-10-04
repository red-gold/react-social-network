import * as React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'

export interface ITextFieldComponentProps extends TextFieldProps {

    /**
     * Input props
     */
   input?: any

   /**
    * Redux meta form
    */
   meta?: any

    /**
     * Styles
     */
    classes?: any

    /**
     * Translation for locale
     */
    t?: (state: any) => any

}
