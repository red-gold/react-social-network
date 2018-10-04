// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import {FormikValues} from 'formik'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'

import { ITextFieldComponentProps } from './ITextFieldComponentProps'
import { ITextFieldComponentState } from './ITextFieldComponentState'
import { textFieldStyles } from './textFieldStyles'
import TextField from '@material-ui/core/TextField'
import { FieldProps } from 'formik'

const TextFieldComponent: React.SFC<
  FieldProps<FormikValues> & ITextFieldComponentProps
  > = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => {
    return (
    <div>
      <TextField
        {...field}
        {...{...props, translate: undefined}}
        helperText={touched[field.name] && errors && errors[field.name] ? errors[field.name] : null}
        error={(touched[field.name] && errors && errors[field.name] !== undefined)}
        type='text'
      />
      </div>
    )
}
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: FieldProps<any> & ITextFieldComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: FieldProps<any> & ITextFieldComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(textFieldStyles as any)(TextFieldComponent as any) as any)
