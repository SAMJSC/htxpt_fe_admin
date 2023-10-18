import { Button, Card, CardHeader, Grid } from '@mui/material'
import { Backburger } from 'mdi-material-ui'
import router from 'next/router'
import FruitForm from 'src/@core/components/FormFruit'
import { LANG_COMMON, LANG_FRUIT } from 'src/constants/convertLang'
import { routerURL } from 'src/navigation/router'

const FruitCreatePage = () => {
  return (
    <Card>
      <Grid display={'flex'} marginLeft={5} marginTop={5} spacing={2}>
        <Button color="success" variant="outlined" startIcon={<Backburger />} onClick={() => router.push(routerURL.FRUIT)}>
          {LANG_COMMON.BACK}
        </Button>
        <CardHeader title={LANG_FRUIT.FRUIT_CREATE} titleTypographyProps={{ variant: 'h6' }} style={{ padding: 10 }} />
      </Grid>
      <FruitForm data={[]} isEdit={false} />
    </Card>
  )
}

export default FruitCreatePage;