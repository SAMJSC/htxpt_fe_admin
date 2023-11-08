import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { routerURL } from "src/navigation/router";
import { checkSuccessRequest } from "src/service/api";
import gardenServices from "src/service/garden";
import { IFormCreateGarden } from "src/utils/type";

export const useGardenCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleCreateGarden = useMutation(
    async (params: IFormCreateGarden) => {

      try {
        const response = await gardenServices.handleCreateGarden(params);

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {

          enqueueSnackbar(LANG_MESS.MES_CREATE_GARDEN_SUCCESS, {
            variant: 'success',
            autoHideDuration: 2000,
          });
          router.push(routerURL.GARDEN);
        }
        else {
          enqueueSnackbar(LANG_MESS.MES_CREATE_GARDEN_ERR, {
            variant: 'error',
            autoHideDuration: 3000,
          });
        }
      },
    },
  );

  return {
    onCreateGarden: handleCreateGarden.mutate
  };
};