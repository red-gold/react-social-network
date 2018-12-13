// - Import react components
import React, { Component } from 'react'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import { ICreateSelectFormProps } from './ICreateSelectFormProps'
import { createSelectFormStyles } from './createSelectFormStyles'
import { FieldProps, FormikValues } from 'formik'

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
      {/* <CreateSelect
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
      /> */}
      </div>
    )

  }
}
export default withStyles(createSelectFormStyles)(CreateSelectForm as any)