// ** MUI Imports
import TextField from '@mui/material/TextField'

// ** Icons Imports

import * as yup from "yup"

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import { forwardRef, useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { InputAdornment } from '@mui/material'
import Date from 'mdi-material-ui/Timelapse'

interface DatePickerProps {
  name: any;
  setDate: any;
  date: Date | null | undefined;
  setValue: any;
  label: string;
}
const DatePickerForm = ({ name, setDate, date, setValue, label }: DatePickerProps) => {

  const CustomInput = forwardRef((props, ref) => {
    setValue(name, date)
    
return <TextField name={name} label={label} inputRef={ref} fullWidth {...props} InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
          <Date />
        </InputAdornment>
      )
    }} />
  })

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={date}
        showYearDropdown
        showMonthDropdown
        id='account-settings-date'
        placeholderText='MM-DD-YYYY'
        customInput={<CustomInput />}
        onChange={(date: Date) => setDate(date)}
      />
    </DatePickerWrapper>
  )
}

export default DatePickerForm;
