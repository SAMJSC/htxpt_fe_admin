import { Grid } from '@mui/material'
import React from 'react'
import FormSearchInput from 'src/@core/components/FormSearchInput'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  category_name: string;
}
interface SearchFormProp {
  setParams: any;
}

const SearchForm = ({ setParams }: SearchFormProp) => {
  const { register, handleSubmit } = useForm<IFormInput | any>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setParams({
      category_name: data.category_name
    })
  };

  return (
    <Grid padding={4}>
      <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex'}}>
        <Grid item xs={12} sm={12}>
          <FormSearchInput name={register("category_name").name} register={register} placeholder={'Tìm kiếm theo tên loại quả'} />
        </Grid>
        <input type="submit" style={{display: 'none'}}/>
      </form>
    </Grid>
  )
}

export default SearchForm