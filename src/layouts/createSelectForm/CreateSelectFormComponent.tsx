// - Import react components
import React, { Component } from 'react'
import classNames from 'classnames'
import CreatableSelect from 'react-select/lib/Creatable'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input/Input'
import {InputProps} from '@material-ui/core/Input/Input'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import { ICreateSelectFormProps } from './ICreateSelectFormProps'
import { ICreateSelectFormState } from './ICreateSelectFormState'
import { createSelectFormStyles } from './createSelectFormStyles'
import { FieldProps, FormikValues } from 'formik'
import CreateSelect from 'layouts/createSelect'
import { ICreateSelectProps } from 'layouts/createSelect/ICreateSelectProps'

class CreateSelectForm extends React.Component<
FieldProps<FormikValues> & ICreateSelectFormProps 
> {
  constructor(props: FieldProps<FormikValues> & ICreateSelectFormProps) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (value: any) => {
    // this is going to call setFieldValue and manually update 
    this.props.onChange(this.props.field.name!, value)
  }

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update 
    this.props.onBlur(this.props.field.name!, true)
  }
  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props
    return (
    <div>
      <CreateSelect
        {...props}
        {...field}
        classes={props.classes}
        options={props.options}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
        helper={touched[field.name] && errors && errors[field.name] ? errors[field.name] : null}
        error={(touched[field.name] && errors && errors[field.name] !== undefined)}
        type='text'
      />
      </div>
    )

  }
}
export default withStyles(createSelectFormStyles)(CreateSelectForm as any) as typeof CreateSelectForm