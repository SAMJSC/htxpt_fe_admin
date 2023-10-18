import { Grid } from '@mui/material'
import React from 'react'
import FormSearchInput from 'src/@core/components/FormSearchInput'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  first_name: string;
  email: string;
  phone: string;
  message: string;
  birth: Date
}
interface SearchFormProp {
  setParams: any;
}

const SearchForm = ({ setParams }: SearchFormProp) => {
  const { register, handleSubmit } = useForm<IFormInput | any>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setParams({
      first_name: data.first_name,
      email: data.email
    })
  };

  return (
    <Grid padding={4}>
      <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex'}}>
        <Grid item xs={12} sm={6} paddingRight={2}>
          <FormSearchInput name={register("first_name").name} register={register} placeholder={'Tìm kiếm theo tên nhà vườn'} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSearchInput name={register("email").name} register={register} placeholder={'Tìm kiếm theo email nhà vườn'} />
        </Grid>
        <input type="submit" style={{display: 'none'}}/>
      </form>
    </Grid>
  )
}

export default SearchForm