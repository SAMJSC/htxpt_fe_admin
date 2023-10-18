import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import _ from 'lodash'
import ViewIcon from 'mdi-material-ui/Eye'
import { useEffect, useState } from 'react'
import { useBonsaiDetailOfGarden } from 'src/@core/components/GardenDetail/hooks'
import ModalCommon from 'src/@core/components/ModalCommon'
import { LANG_BONSAI, LANG_MESS } from 'src/constants/convertLang'
import { formatDate } from 'src/utils'

const ViewBonsaiDetail = ({ idBonsai }: { idBonsai: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, onGetBonsaiOfGardenById }: any = useBonsaiDetailOfGarden(idBonsai);

  useEffect(() => {
    onGetBonsaiOfGardenById
  }, [onGetBonsaiOfGardenById, idBonsai])

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
              {LANG_BONSAI.TREE_DETAIL}
            </Typography>
            <Stack direction="row" spacing={2} alignItems='center' justifyContent='center'>
              <Grid xs={12} md={12}>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={3}>{LANG_BONSAI.TREE_NAME}:</Grid>
                  <Grid xs={6}>{data?.tree_name}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={3}>{LANG_BONSAI.DESCRIPTION}:</Grid>
                  <Grid xs={6}>{data?.description}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={3}>{LANG_BONSAI.QUANTITY}:</Grid>
                  <Grid xs={6}>{data?.quantity}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={3}>{LANG_BONSAI.CREATE_AT}:</Grid>
                  <Grid xs={6}>{formatDate(data?.created_at)}</Grid>
                </Grid>
                <Grid spacing={6} md={12} display='flex' marginBottom={2}>
                  <Grid xs={3}>{LANG_BONSAI.DELETE_AT}:</Grid>
                  <Grid xs={6}>{data?.deleted_at && formatDate(data?.deleted_at)}</Grid>
                </Grid>
              </Grid>

              {!_.isEmpty(data?.bonsai_images) &&
                <Grid xs={12} md={14}>
                  <ImageList cols={2} rowHeight={300}>
                    {data?.bonsai_images?.map((item: any) => (
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

export default ViewBonsaiDetail