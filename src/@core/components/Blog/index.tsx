import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import DeleteIcon from 'mdi-material-ui/Delete'
import ViewIcon from 'mdi-material-ui/Eye'
import RefreshIcon from 'mdi-material-ui/Refresh'
import Link from 'next/dist/client/link'
import { ReactNode, useEffect, useState } from 'react'
import SearchForm from 'src/@core/components/Blog/SearchForm'
import { useBlog, useBlogDelete } from 'src/@core/components/Blog/hooks'
import ModalCommon from 'src/@core/components/ModalCommon'
import { LANG_BLOG, LANG_MESS } from 'src/constants/convertLang'
import { routerURL } from 'src/navigation/router'
import { formatDate } from 'src/utils'
import TableCommon from 'src/views/tables/TableCommon'

interface Data {
  _id: string;
  title: string;
  content: ReactNode;
  short_description: ReactNode;
  created_at: string;
  action: any
}
interface HeadCell {
  disablePadding: boolean;
  key: keyof Data;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  {
    key: 'title',
    numeric: false,
    disablePadding: false,
    label: LANG_BLOG.BLOG_NAME,
  },
  {
    key: 'created_at',
    numeric: false,
    disablePadding: false,
    label: LANG_BLOG.DATE,
  },
  {
    key: 'content',
    numeric: true,
    disablePadding: false,
    label: LANG_BLOG.TITLE,
  },
  {
    key: 'short_description',
    numeric: true,
    disablePadding: false,
    label: LANG_BLOG.DESCRIPTION,
  },
];

function createData(
  _id: string,
  title: string,
  content: ReactNode,
  short_description: ReactNode,
  created_at: string,
  action: ReactNode
): Data {
  return {
    _id,
    title,
    content,
    short_description,
    created_at,
    action
  };
}

const BlogCard = () => {
  const [params, setParams] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [idDel, setIdDel] = useState('');

  const { onGetBlog, data, refetchBlog } = useBlog(params);
  const { onDeleteBlog } = useBlogDelete();

  const ActionHandle = ({ idItem }: { idItem: string }) => {

    const handleOpen = () => {
      setIsOpen(true);
      setIdDel(idItem)
    }

    const handleClose = () => setIsOpen(false);

    const handleDelete = async () => {

      onDeleteBlog({
        onRefetch: () => refetchBlog(),
        id: idDel
      })
      setIsOpen(false);

    }

    return (
      <Grid display='flex'>
        <Grid className='hover-action' marginRight={2}>
          <span onClick={handleOpen}>
            <DeleteIcon />
          </span>
          <ModalCommon open={isOpen} handleClose={handleClose}>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {LANG_MESS.CONFIRM_DEL_BLOG}
              </Typography>
              <Grid display='flex' justifyContent='center'>
                <Button onClick={handleDelete}>{LANG_MESS.YES}</Button>
                <Button onClick={handleClose}>{LANG_MESS.NO}</Button>
              </Grid>
            </Box>
          </ModalCommon>
        </Grid>
        <Grid className='hover-action'>
          <Link href={`${routerURL.BLOG}/${idItem}`}>
            <span>
              <ViewIcon />
            </span>
          </Link>
        </Grid>
      </Grid>
    )
  }
  useEffect(() => {
    onGetBlog;
  }, [onGetBlog, params])

  const dataBlog = data.map((value: Data) => (
    createData(
      value?._id,
      value?.title,
      <Grid textAlign='start' style={{
        height: '1.2em',
        width: '178px',
        overflow: 'hidden',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{value?.content}</Grid>,
      <Grid textAlign='start' style={{
        height: '1.2em',
        width: '178px',
        overflow: 'hidden',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{value?.short_description}</Grid>,
      formatDate(value?.created_at),
      <ActionHandle idItem={value?._id} />,
    )
  ))
  const handleRefresh = () => {
    setParams({});
  }
  
  return (
    <Grid container spacing={6}>
      <CardHeader title={LANG_BLOG.BLOG_MANAGEMENT} titleTypographyProps={{ variant: 'h6' }} />
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Card>
            <Grid display='flex' justifyContent='space-between'>
            <Grid display='flex' justifyContent='space-between' alignItems='center'>
                <SearchForm setParams={setParams} />
                <Grid onClick={handleRefresh} style={{cursor: 'pointer', marginTop: 2}}>
                  <RefreshIcon />
                </Grid>
              </Grid>
              <Grid padding={4}>
                <Link href={routerURL.BLOG_CREATE}>
                  <Button variant="contained" color="success">
                    {LANG_BLOG.BTN_CREATE}
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <CardContent>
              <TableCommon headCells={headCells} rows={dataBlog} isSelect={false} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BlogCard;