import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import DeleteIcon from 'mdi-material-ui/Delete'
import ViewIcon from 'mdi-material-ui/Eye'
import RefreshIcon from 'mdi-material-ui/Refresh'

import Link from 'next/dist/client/link'
import { ReactNode, useEffect, useState } from 'react'
import SearchForm from 'src/@core/components/Garden/SearchForm'
import { useDeleteGardener, useGardener } from 'src/@core/components/Garden/hooks'
import ModalCommon from 'src/@core/components/ModalCommon'
import { LANG_GARDEN, LANG_MESS } from 'src/constants/convertLang'
import { routerURL } from 'src/navigation/router'
import { formatDate } from 'src/utils'
import TableCommon from 'src/views/tables/TableCommon'

interface Data {
  _id: string;
  full_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
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
    key: 'full_name',
    numeric: false,
    disablePadding: false,
    label: LANG_GARDEN.USER_NAME,
  },
  {
    key: 'date_of_birth',
    numeric: false,
    disablePadding: false,
    label: LANG_GARDEN.DATE,
  },
  {
    key: 'phone',
    numeric: false,
    disablePadding: false,
    label: LANG_GARDEN.PHONE,
  },
  {
    key: 'email',
    numeric: false,
    disablePadding: false,
    label: LANG_GARDEN.EMAIL,
  }
];

function createData(
  _id: string,
  full_name: string,
  phone: string,
  email: string,
  date_of_birth: string,
  action: ReactNode
): Data {
  return {
    _id,
    full_name,
    phone,
    email,
    date_of_birth,
    action
  };
}

const GardenCard = () => {
  const [params, setParams] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [idDel, setIdDel] = useState('');
  const { onGetGarden, data, refetchGarden } = useGardener(params);

  const ActionHandle: any = ({ idItem }: { idItem: any }) => {
    const { onDeleteGarden } = useDeleteGardener();

    const handleOpen = () => {
      setIsOpen(true);
      setIdDel(idItem)
    }

    const handleClose = () => setIsOpen(false);

    const handleDelete = async () => {

      onDeleteGarden({
        onRefetch: () => refetchGarden(),
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
                {LANG_MESS.CONFIRM_DEL_GARDEN}
              </Typography>
              <Grid display='flex' justifyContent='center'>
                <Button onClick={handleDelete}>{LANG_MESS.YES}</Button>
                <Button onClick={handleClose}>{LANG_MESS.NO}</Button>
              </Grid>
            </Box>
          </ModalCommon>
        </Grid>
        <Grid className='hover-action'>
          <Link href={`${routerURL.GARDEN}/${idItem}`}>
            <span>
              <ViewIcon />
            </span>
          </Link>
        </Grid>
      </Grid>
    )
  }
  useEffect(() => {
    onGetGarden;
  }, [onGetGarden, params])

  const dataGarden = data?.map((value: Data) => createData(
    value?._id,
    value?.full_name,
    value?.phone,
    value?.email,
    formatDate(value?.date_of_birth),
    <ActionHandle idItem={value?._id} />,
  ))
  const handleRefresh = () => {
    setParams({});
  }

  return (
    <Grid container spacing={6}>
      <CardHeader title={LANG_GARDEN.GARDEN_MANAGEMENT} titleTypographyProps={{ variant: 'h6' }} />
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
                <Link href={routerURL.BLOG_GARDEN}>
                  <Button variant="contained" color="success">
                    {LANG_GARDEN.BTN_CREATE}
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <CardContent>
              <TableCommon headCells={headCells} rows={dataGarden} isSelect={false} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GardenCard