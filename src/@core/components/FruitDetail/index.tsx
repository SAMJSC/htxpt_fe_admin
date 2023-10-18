import { Button, Card, CardHeader, Grid } from '@mui/material';
import _ from 'lodash';
import { Backburger } from 'mdi-material-ui';
import router from 'next/router';
import { useEffect } from 'react';
import FruitForm from 'src/@core/components/FormFruit';
import { useFruitDetail } from 'src/@core/components/FruitDetail/hooks';
import { LANG_COMMON, LANG_FRUIT } from 'src/constants/convertLang';
import { routerURL } from 'src/navigation/router';

const FruitDetailPage = ({ id }: { id: string }) => {
  const { data, onGetFruitById }: any = useFruitDetail(id);

  useEffect(() => {
    onGetFruitById;
  }, [onGetFruitById, id])

  return (
    <Card>
      <Grid display={'flex'} marginLeft={5} marginTop={5} spacing={2}>
        <Button color="success" variant="outlined" startIcon={<Backburger />} onClick={() => router.push(routerURL.FRUIT)}>
          {LANG_COMMON.BACK}
        </Button>
      <CardHeader title={LANG_FRUIT.FRUIT_DETAIL} titleTypographyProps={{ variant: 'h6' }} style={{ padding: 10 }} />
      </Grid>
      {!_.isEmpty(data) && <FruitForm data={data} isEdit/>}
    </Card>
  )
}

export default FruitDetailPage