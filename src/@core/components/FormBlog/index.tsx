import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CardContent, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import _ from 'lodash'
import { AccountOutline, MessageOutline } from 'mdi-material-ui'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useBlogCreate } from 'src/@core/components/BlogCreate/hooks'
import { useUpdateBlogDetail } from 'src/@core/components/BlogDetail/hooks'
import { LANG_BLOG } from 'src/constants/convertLang'
import { schemaBlog } from 'src/utils/schema'

interface IFormInput {
  title: string;
  content: string;
  shortDescription: string;
}

const BlogForm = ({ data, isEdit }: any) => {
  const { onCreateBlog } = useBlogCreate()
  const { onUpdateFruitCategory } = useUpdateBlogDetail()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput | any>({
    resolver: yupResolver(schemaBlog)
  });

  const onSubmit: SubmitHandler<IFormInput> = (dataBlog) => {
    const param = {
      title: dataBlog.title,
      content: dataBlog.content,
      short_description: dataBlog.shortDescription,
    }
    if (isEdit) {
      onUpdateFruitCategory({ id: data?._id, ...param })
    }
    else {
      onCreateBlog(param)
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              {...register("title")}
              multiline
              label={LANG_BLOG.BLOG_NAME}
              placeholder={LANG_BLOG.BLOG_NAME}
              defaultValue={!_.isEmpty(data) ? data?.title : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountOutline />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.title?.message}</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              {...register("content")}
              multiline
              minRows={3}
              label={LANG_BLOG.CONTENT}
              placeholder={LANG_BLOG.CONTENT}
              defaultValue={!_.isEmpty(data) ? data?.content : ''}
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MessageOutline />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.content?.message}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              {...register("shortDescription")}
              multiline
              minRows={3}
              label={LANG_BLOG.DESCRIPTION}
              placeholder={LANG_BLOG.DESCRIPTION}
              defaultValue={!_.isEmpty(data) ? data?.short_description : ''}
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MessageOutline />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='caption' color='red'>{errors.shortDescription?.message}</Typography>
          </Grid>

          <Grid item xs={12} textAlign='center'>
            <Button type='submit' variant='contained' color='success' size='large'>
              {!isEdit ? LANG_BLOG.BTN_CREATE : LANG_BLOG.BTN_EDIT}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default BlogForm;