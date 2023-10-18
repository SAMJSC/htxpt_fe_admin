import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CardContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { AccountOutline, EyeOffOutline, EyeOutline, Phone } from 'mdi-material-ui'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import DatePickerForm from 'src/@core/components/datePicker'
import { LANG_GARDEN } from 'src/constants/convertLang'
import { schemaGarden } from 'src/utils/schema'

import { useGardenCreate } from 'src/@core/components/GardenCreate/hooks'
import { formatBirth } from 'src/utils'

interface IFormInput {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  confirm_password: string;
}

const GardenForm = ({ data }: any) => {
  const [date, setDate] = useState<Date | any>(null)
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showCfPass, setShowCfPass] = useState<boolean>(false)

  const { onCreateGarden } = useGardenCreate()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput | any>({
    resolver: yupResolver(schemaGarden)
  });

  const onSubmit: SubmitHandler<IFormInput> = (dataBlog) => {
    const param = {
      ...dataBlog,
      date_of_birth: formatBirth(date)
    }
    onCreateGarden(param)
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("first_name")}
              multiline
              label={LANG_GARDEN.FIRST_NAME}
              placeholder={LANG_GARDEN.FIRST_NAME}
              defaultValue={data?.title}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountOutline />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.first_name?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <DatePickerForm
                name={register("date_of_birth").name}
                date={date}
                setDate={setDate}
                setValue={setValue}
                label='Birth'
              />
            </Grid>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker"/>
              </DemoContainer>
            </LocalizationProvider> */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("last_name")}
              multiline
              label={LANG_GARDEN.LAST_NAME}
              placeholder={LANG_GARDEN.LAST_NAME}
              defaultValue={data?.title}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountOutline />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.last_name?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("phone")}
              multiline
              label={LANG_GARDEN.PHONE}
              placeholder={LANG_GARDEN.PHONE}
              defaultValue={data?.title}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.phone?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={LANG_GARDEN.PASS_WORD}
              {...register("password")}
              type={showPass ? 'text' : 'password'}
              InputProps={{
                style: { width: '100%' },
                endAdornment: (
                  <InputAdornment position='start' >
                    <IconButton
                      edge='end'
                      onClick={() => setShowPass(!showPass)}
                      aria-label='toggle password visibility'
                    >
                      {showPass ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.password?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={LANG_GARDEN.CF_PASS_WORD}
              {...register("confirm_password")}
              type={showCfPass ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => setShowCfPass(!showCfPass)}
                      aria-label='toggle password visibility'
                    >
                      {showCfPass ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.confirm_password?.message}</Typography>
          </Grid>
          <Grid item xs={12} textAlign='center'>
            <Button type='submit' variant='contained' color='success' size='large'>
              {LANG_GARDEN.BTN_CREATE}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default GardenForm;