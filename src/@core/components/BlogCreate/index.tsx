import { Button, Card, CardHeader, Grid } from '@mui/material'
import { Backburger } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import BlogForm from 'src/@core/components/FormBlog'
import { LANG_BLOG, LANG_COMMON } from 'src/constants/convertLang'
import { routerURL } from 'src/navigation/router'

const BlogCreatePage = () => {
  const router = useRouter();

  return (
    <Card>
      <Grid display={'flex'} marginLeft={5} marginTop={5} spacing={2}>
        <Button color="success" variant="outlined" startIcon={<Backburger />} onClick={() => router.push(routerURL.BLOG)}>
          {LANG_COMMON.BACK}
        </Button>
      <CardHeader title={LANG_BLOG.BLOG_CREATE} titleTypographyProps={{ variant: 'h6' }} style={{ padding: 10 }} />
      </Grid>
      <BlogForm />
    </Card>
  )
}

export default BlogCreatePage;