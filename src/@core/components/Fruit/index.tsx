import { Button, Card, CardContent, CardHeader, Grid,Box,Typography } from '@mui/material'
import RefreshIcon from 'mdi-material-ui/Refresh'
import ViewIcon from 'mdi-material-ui/Eye'
import Link from 'next/dist/client/link'
import { ReactNode, useEffect, useState } from 'react'
import { useFruit, useFruitDelete } from 'src/@core/components/Fruit/hooks'
import SearchForm from 'src/@core/components/Fruit/SearchForm'
import ModalCommon from 'src/@core/components/ModalCommon'
import { LANG_FRUIT, LANG_MESS } from 'src/constants/convertLang'
import { routerURL } from 'src/navigation/router'
import { formatDate } from 'src/utils'
import TableCommon from 'src/views/tables/TableCommon'
import DeleteIcon from 'mdi-material-ui/Delete'

interface Data {
  _id: string;
  category_name: string;
  dimeter: any;
  shape: string;
  range_price: any;
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
    key: 'category_name',
    numeric: false,
    disablePadding: false,
    label: LANG_FRUIT.FRUIT_NAME,
  },
  {
    key: 'created_at',
    numeric: false,
    disablePadding: false,
    label: LANG_FRUIT.CREATE_AT,
  },
  {
    key: 'dimeter',
    numeric: true,
    disablePadding: false,
    label: LANG_FRUIT.DIMETER,
  },
  {
    key: 'shape',
    numeric: true,
    disablePadding: false,
    label: LANG_FRUIT.SHAPE,
  },
  
  {
    key: 'range_price',
    numeric: true,
    disablePadding: false,
    label: LANG_FRUIT.RANGE_PRICE,
  },
];

function createData(
  _id: string,
  category_name: string,
  dimeter: any,
  shape: string,
  range_price: any,
  created_at: string,
  action: ReactNode
): Data {
  return {
    _id,
    category_name,
    dimeter,
    shape,
    range_price,
    created_at,
    action
  };
}

const FruitCard = () => {
  const [params, setParams] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [idDel, setIdDel] = useState('');

  const { onGetFruit, data, refetchFruit } = useFruit(params);
  const { onDeleteFruit } = useFruitDelete();

  const ActionHandle = ({ idItem }: { idItem: string }) => {

    const handleOpen = () => {
      setIsOpen(true);
      setIdDel(idItem)
    }

    const handleClose = () => setIsOpen(false);

    const handleDelete = async () => {

      onDeleteFruit({
        onRefetch: () => refetchFruit(),
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
                {LANG_MESS.CONFIRM_DEL_FRUIT}
              </Typography>
              <Grid display='flex' justifyContent='center'>
                <Button onClick={handleDelete}>{LANG_MESS.YES}</Button>
                <Button onClick={handleClose}>{LANG_MESS.NO}</Button>
              </Grid>
            </Box>
          </ModalCommon>
        </Grid>
        <Grid className='hover-action'>
          <Link href={`${routerURL.FRUIT}/${idItem}`}>
            <span>
              <ViewIcon />
            </span>
          </Link>
        </Grid>
      </Grid>
    )
  }
  useEffect(() => {
    onGetFruit;
  }, [onGetFruit, params])

  const dataFruit = data?.map((value: Data) => (
    createData(
      value?._id,
      value?.category_name,
      (value?.dimeter[0] || 0) + '(cm)' + " - " + (value?.dimeter[1] || 0) + '(cm)',
      (value?.shape[0] || 0) + "," + (value?.shape[1] || ''),
      (value?.range_price[0] || 0) + '(VNĐ)' + " - " + (value?.range_price[1] || 0) + '(VNĐ)',
      formatDate(value?.created_at),
      <ActionHandle idItem={value?._id} />,
    )
  ))
  const handleRefresh = () => {
    setParams({});
  }

  return (
    <Grid container spacing={6}>
      <CardHeader title={LANG_FRUIT.FRUIT_MANAGEMENT} titleTypographyProps={{ variant: 'h6' }} />
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
                <Link href={routerURL.FRUIT_CREATE}>
                  <Button variant="contained" color="success">
                    {LANG_FRUIT.BTN_CREATE}
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <CardContent>
              <TableCommon headCells={headCells} rows={dataFruit} isSelect={false} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FruitCard;