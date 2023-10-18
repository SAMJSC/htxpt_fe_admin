import { Grid, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import Magnify from 'mdi-material-ui/Magnify'

const FormSearchInput = (props: any) => {
  const { register, name, placeholder } = props

  return (
    <Grid item xs={12}>
      <TextField
        {...register(name)}
        size='small'
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Magnify fontSize='small' />
            </InputAdornment>
          )
        }}
      />
    </Grid>
  )
}

export default FormSearchInput