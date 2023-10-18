import { Button, Card, CardHeader, Grid } from '@mui/material'
import { Backburger } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import GardenForm from 'src/@core/components/FromGarden'
import { LANG_COMMON, LANG_GARDEN } from 'src/constants/convertLang'
import { routerURL } from 'src/navigation/router'

const GardenCreatePage = () => {
  const router = useRouter();

  return (
    <Card>
      <Grid display={'flex'} marginLeft={5} marginTop={5} spacing={2}>
        <Button color="success" variant="outlined" startIcon={<Backburger />} onClick={() => router.push(routerURL.GARDEN)}>
          {LANG_COMMON.BACK}
        </Button>
      <CardHeader title={LANG_GARDEN.GARDEN_CREATE} titleTypographyProps={{ variant: 'h6' }} style={{ padding: 10 }} />
      </Grid>
      <GardenForm />
    </Card>
  )
}

export default GardenCreatePage;