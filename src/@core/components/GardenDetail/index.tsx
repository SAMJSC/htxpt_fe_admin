import { Avatar, Button, Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import { Backburger } from 'mdi-material-ui';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import { useGardenerDetail } from 'src/@core/components/Garden/hooks';
import ViewBonsaiDetail from 'src/@core/components/GardenDetail/ViewBonsaiDetail';
import ViewFruitDetail from 'src/@core/components/GardenDetail/ViewFruitDetail';
import { LANG_BONSAI, LANG_COMMON, LANG_FRUIT, LANG_GARDEN } from 'src/constants/convertLang';
import { routerURL } from 'src/navigation/router';
import { formatDate } from 'src/utils';
import { DataBonsai, DataFruit, HeadCellBonsai, HeadCellFruit } from 'src/utils/type';
import TableCommon from 'src/views/tables/TableCommon';

const headCellFruit: HeadCellFruit[] = [
  {
    key: 'fruit_name',
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
    key: 'quantity',
    numeric: true,
    disablePadding: false,
    label: LANG_FRUIT.QUANTITY,
  },
];

function createDataFruit(
  fruit_categories: string,
  fruit_name: string,
  quantity: string,
  created_at: string,
  action: ReactNode
): DataFruit {
  return {
    fruit_categories,
    fruit_name,
    quantity,
    created_at,
    action
  };
}

const headCellBonsai: HeadCellBonsai[] = [
  {
    key: 'tree_name',
    numeric: false,
    disablePadding: false,
    label: LANG_BONSAI.TREE_NAME,
  },
  {
    key: 'created_at',
    numeric: false,
    disablePadding: false,
    label: LANG_BONSAI.CREATE_AT,
  },
  {
    key: 'quantity',
    numeric: true,
    disablePadding: false,
    label: LANG_BONSAI.QUANTITY,
  },
];

function createDataBonsai(
  _id: string,
  tree_name: string,
  quantity: string,
  created_at: string,
  action: ReactNode,
): DataBonsai {
  return {
    _id,
    tree_name,
    quantity,
    created_at,
    action,
  };
}

const GardenDetailPage = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data, onGetGardenById }: any = useGardenerDetail(id);

  useEffect(() => {
    onGetGardenById;
  }, [onGetGardenById, id])

  const dataFruitByGarden = data?.fruits?.map((value: DataFruit) => createDataFruit(
    value?.fruit_categories,
    value?.fruit_name,
    value?.quantity,
    formatDate(value?.created_at),
    <ViewFruitDetail idFruit={value?._id} />
  ))

  const dataBonsaiByGarden = data?.bonsai?.map((value: DataBonsai) => createDataBonsai(
    value?._id,
    value?.tree_name,
    value?.quantity,
    formatDate(value?.created_at),
    <ViewBonsaiDetail idBonsai={value?._id} />
  ))

  return (
    <Grid container spacing={6}>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Card>
            <Grid display={'flex'} marginLeft={5} marginTop={5} spacing={2}>
              <Button color="success" variant="outlined" startIcon={<Backburger />} onClick={() => router.push(routerURL.GARDEN)}>
                {LANG_COMMON.BACK}
              </Button>
              <CardHeader title={LANG_GARDEN.GARDEN_DETAIL} titleTypographyProps={{ variant: 'h6' }} style={{ padding: 10 }} />
            </Grid>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems='center' justifyContent='center'>
                <Grid xs={6}>
                  <Grid spacing={6} md={12} display='flex'>
                    <Grid xs={3}>{LANG_GARDEN.USER_NAME}:</Grid>
                    <Grid xs={8}>{data?.first_name + " " + data?.last_name}</Grid>
                  </Grid>
                  <Grid spacing={6} md={12} display='flex'>
                    <Grid xs={3}>{LANG_GARDEN.EMAIL}:</Grid>
                    <Grid xs={8}>{data?.email}</Grid>
                  </Grid>
                  <Grid spacing={6} md={12} display='flex'>
                    <Grid xs={3}>{LANG_GARDEN.PHONE}:</Grid>
                    <Grid xs={8}>{data?.phone}</Grid>
                  </Grid>
                  <Grid spacing={6} md={12} display='flex'>
                    <Grid xs={3}>{LANG_GARDEN.DATE}:</Grid>
                    <Grid xs={8}>{formatDate(data?.date_of_birth)}</Grid>
                  </Grid>
                  <Grid spacing={6} md={12} display='flex'>
                    <Grid xs={3}>{LANG_GARDEN.RATE}:</Grid>
                    <Grid xs={8}>{data?.rating_avg}</Grid>
                  </Grid>
                </Grid>

                <Avatar
                  alt="Remy Sharp"
                  src={data?.avatar}
                  sx={{ width: 200, height: 200 }}
                />

              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CardHeader title={LANG_FRUIT.FRUIT_MANAGEMENT} titleTypographyProps={{ variant: 'h6' }} />
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableCommon headCells={headCellFruit} rows={dataFruitByGarden} isSelect={false} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CardHeader title={LANG_BONSAI.TREE_MANAGEMENT} titleTypographyProps={{ variant: 'h6' }} />
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableCommon headCells={headCellBonsai} rows={dataBonsaiByGarden} isSelect={false} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GardenDetailPage