// - Import react components
import React, { Component } from 'react'
import classNames from 'classnames'
import CreatableSelect from 'react-select'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input/Input'
import {InputProps} from '@material-ui/core/Input/Input'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import CancelIcon from '@material-ui/icons/Cancel'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ClearIcon from '@material-ui/icons/Clear'
import Chip from '@material-ui/core/Chip'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import { ISelectProps } from './ISelectProps'
import { ISelectState } from './ISelectState'
import { selectStyles } from './selectStyles'
import { FieldProps } from 'formik'

class Option extends React.Component<any, any> {
  handleClick = (event: any) => {
    this.props.onSelect(this.props.option, event)
  }

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component='div'
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    )
  }
}

const SelectWrapped = (props: any) => {
  const { classes, ...other } = props

  return (
    <CreatableSelect
      promptTextCreator={(label: string) => `Create tag "${label}"`}
      optionComponent={Option}
      newOptionCreator={(value: any) => {
        return ({ [value.labelKey]: value.label.toLocaleLowerCase(), [value.valueKey]: value.label.toLocaleLowerCase() })
      }
      }
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={(arrowProps: any) => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={(valueProps: any) => {
        const { value, children, onRemove } = valueProps

        const onDelete = (event: any) => {
          event.preventDefault()
          event.stopPropagation()
          onRemove(value)
        }

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          )
        }

        return <div className='Select-value'>{children}</div>
      }}
      {...other}
    />
  )
}

const Select = (props: ISelectProps) => {
  return (
    <FormControl error={props.error} fullWidth={props.fullWidth}>
      <Input
        {...{ ...props, classes: undefined, options: undefined, helper: undefined, touched: undefined }}
        inputComponent={SelectWrapped}
        inputProps={{
          classes: props.classes,
          multi: true,
          instanceId: `innerInstance-${props.id}`,
          simpleValue: true,
          options: props.options,
          name: props.name,
          id: props.name
        }}
      />
      <FormHelperText id={`helper-${props.id}`}>{props.helper}</FormHelperText>
    </FormControl>
  )
}

export default withStyles(selectStyles as any)(Select)