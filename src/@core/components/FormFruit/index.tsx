import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Button, CardContent, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import _ from 'lodash'
import { AccountOutline, CurrencyUsd, Diameter, Weight } from 'mdi-material-ui'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useFruitCreate } from 'src/@core/components/FruitCreate/hooks'
import { useUpdateFruitDetail } from 'src/@core/components/FruitDetail/hooks'
import { LANG_FRUIT, LANG_MESS } from 'src/constants/convertLang'
import { schemaFruit } from 'src/utils/schema'

interface IFormInput {
  _id?: string;
  category_name: string;
  diameter_max: number;
  diameter_min: number;
  range_price_max: number;
  range_price_min: number;
  weight_min: number;
  weight_max: number;
  shape: any
}
const optionShape = [
  { value: LANG_FRUIT.SHAPE_1 },
  { value: LANG_FRUIT.SHAPE_2 },
  { value: LANG_FRUIT.SHAPE_3 },
  { value: LANG_FRUIT.SHAPE_4 },
];

const FruitForm = ({ data, isEdit }: any) => {

  const [shape, setShape] = useState(data?.shape || []);
  const { onCreateFruit } = useFruitCreate();
  const { onUpdateFruitCategory } = useUpdateFruitDetail();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput | any>({
    resolver: yupResolver(schemaFruit)
  });

  let optionShapeData: { value: any }[] = []
  if (!_.isEmpty(data)) {
    
    optionShapeData = data?.shape?.map((value: any) => (
      {
        ...optionShapeData,
        value: value
      }
    ))
  }

  const onSubmit: SubmitHandler<IFormInput> = (dataFruit) => {
    const param = {
      category_name: dataFruit?.category_name,
      range_price: [Number(dataFruit?.range_price_min), Number(dataFruit?.range_price_max)],
      shape: shape,
      dimeter: [Number(dataFruit?.diameter_min), Number(dataFruit?.diameter_max)],
      weight: [Number(dataFruit?.weight_min), Number(dataFruit?.weight_max)]
    }
    if (_.isEmpty(shape)) {
      enqueueSnackbar(`${LANG_FRUIT.SHAPE} ${LANG_MESS.REQUIRED}`, {
        variant: 'error',
        autoHideDuration: 2000,
      });

      return
    }
    if (isEdit) {
      onUpdateFruitCategory({ id: data?._id, ...param })
    }
    else {
      onCreateFruit(param)
    }

  };

  const handleChangeShape = (e: any, value: any) => {
    setShape(value.map((valueShape: { value: string }) => valueShape));    
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              {...register("category_name")}
              label={LANG_FRUIT.FRUIT_NAME}
              placeholder={LANG_FRUIT.FRUIT_NAME}
              defaultValue={data?.category_name && data?.category_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountOutline />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.category_name?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("range_price_min")}
              label={LANG_FRUIT.RANGE_PRICE_MIN}
              placeholder='VNĐ'
              type='number'
              helperText={LANG_MESS.SUGGEST}
              defaultValue={!_.isEmpty(data) && data?.range_price[0]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CurrencyUsd />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.range_price_min?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("range_price_max")}
              label={LANG_FRUIT.RANGE_PRICE_MAX}
              placeholder='VNĐ'
              type='number'
              helperText={LANG_MESS.SUGGEST}
              defaultValue={!_.isEmpty(data) && data?.range_price[1]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CurrencyUsd />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.range_price_max?.message}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-readOn"
              filterSelectedOptions
              options={optionShape?.map((option) => option?.value)}
              defaultValue={optionShapeData?.map((option) => option?.value)}
              onChange={(event, value) => handleChangeShape(event, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("shape")}
                  variant="filled"
                  label={LANG_FRUIT.SHAPE}
                  placeholder={LANG_FRUIT.SHAPE}
                />
              )}
            />
            <Typography variant='caption' color='red'>{errors.shape?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("diameter_min")}
              label={LANG_FRUIT.DIMETER_MIN}
              placeholder='(cm)'
              type='number'
              defaultValue={!_.isEmpty(data) && data?.dimeter[0]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Diameter />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.diameter_min?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("diameter_max")}
              label={LANG_FRUIT.DIMETER_MAX}
              placeholder='(cm)'
              type='number'
              defaultValue={!_.isEmpty(data) && data?.dimeter[1]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Diameter />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.diameter_max?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("weight_min")}
              label={LANG_FRUIT.WEIGHT_MIN}
              placeholder='(g)'
              type='number'
              defaultValue={!_.isEmpty(data) && data?.weight[0]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Weight />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.weight_min?.message}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("weight_max")}
              label={LANG_FRUIT.WEIGHT_MAX}
              placeholder='(g)'
              type='number'
              defaultValue={!_.isEmpty(data) && data?.weight[1]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Weight />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.weight_max?.message}</Typography>
          </Grid>

          <Grid item xs={12} textAlign='center'>
            <Button type='submit' variant='contained' color='success' size='large'>
              {isEdit ? LANG_FRUIT.BTN_EDIT : LANG_FRUIT.BTN_CREATE}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default FruitForm;