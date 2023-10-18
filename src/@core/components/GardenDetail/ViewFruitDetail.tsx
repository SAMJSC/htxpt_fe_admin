import { Box, Button, Grid, Typography, Stack } from '@mui/material'
import _ from 'lodash'
import ViewIcon from 'mdi-material-ui/Eye'
import { useState, useEffect } from 'react'
import { useFruitDetailOfGarden } from 'src/@core/components/GardenDetail/hooks'
import ModalCommon from 'src/@core/components/ModalCommon'
import { LANG_FRUIT, LANG_MESS } from 'src/constants/convertLang'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ViewFruitDetail = ({ idFruit }: { idFruit: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, onGetFruitOfGardenById }: any = useFruitDetailOfGarden(idFruit);

  useEffect(() => {
    onGetFruitOfGardenById
  }, [onGetFruitOfGardenById, idFruit])

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => setIsOpen(false);

  return (
    <Grid display='flex'>
      <Grid className='hover-action' marginRight={2}>
        <span onClick={handleOpen}>
          <ViewIcon />
        </span>
        <ModalCommon open={isOpen} handleClose={handleClose} widthModal>
          <Box>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 24, fontWeight: 600 }}>
              {LANG_FRUIT.FRUIT_DETAIL}
            </Typography>
            <Stack direction="row" spacing={2} alignItems='center' justifyContent='center'>
              <Grid xs={12} md={10}>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={4}>{LANG_FRUIT.FRUIT_NAME}:</Grid>
                  <Grid xs={8}>{data?.fruit_name}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={4}>{LANG_FRUIT.QUANTITY}:</Grid>
                  <Grid xs={8}>{data?.quantity}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={4}>{LANG_FRUIT.RANGE_PRICE}:</Grid>
                  <Grid xs={8}>{!_.isEmpty(data?.range_price) && data?.range_price[0] + " - " + data?.range_price[1]}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={4}>{LANG_FRUIT.SHAPE}:</Grid>
                  <Grid xs={8}>{!_.isEmpty(data?.shape) && data?.shape[0] + " - " + data?.shape[1]}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={4}>{LANG_FRUIT.DIMETER}:</Grid>
                  <Grid xs={8}>{!_.isEmpty(data?.dimeter) && data?.dimeter[0] + " - " + data?.dimeter[1]}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={4}>{LANG_FRUIT.WEIGHT}:</Grid>
                  <Grid xs={8}>{!_.isEmpty(data?.weight) && data?.weight[0] + " - " + data?.weight[1]}</Grid>
                </Grid>
              </Grid>
              {!_.isEmpty(data?.fruit_images) &&
                <Grid xs={12} md={14}>
                  <ImageList cols={2} rowHeight={300}>
                    {data?.fruit_images?.map((item: any) => (
                      <ImageListItem key={item.public_id}>
                        <img
                          src={item.url}
                          alt={item.public_id}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              }
            </Stack>
            <Grid display='flex' justifyContent='end'>
              <Button onClick={handleClose}>{LANG_MESS.CANCEL}</Button>
            </Grid>
          </Box>
        </ModalCommon>
      </Grid>
    </Grid>
  )
}

export default ViewFruitDetail