import { Grid } from '@mui/material'
import React from 'react'
import FormSearchInput from 'src/@core/components/FormSearchInput'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  title: string;
}
interface SearchFormProp {
  setParams: any;
}

const SearchForm = ({ setParams }: SearchFormProp) => {
  const { register, handleSubmit } = useForm<IFormInput | any>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setParams({
      title: data.title
    })
  };

  return (
    <Grid padding={4}>
      <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex'}}>
        <Grid item xs={12} sm={12}>
          <FormSearchInput name={register("title").name} register={register} placeholder={'Tìm kiếm theo tên bài viết'} />
        </Grid>
        <input type="submit" style={{display: 'none'}}/>
      </form>
    </Grid>
  )
}

export default SearchForm