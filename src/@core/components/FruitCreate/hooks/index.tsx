import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { checkSuccessRequest } from "src/service/api";
import fruitServices from "src/service/fruit";

export const useFruitCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleCreateFruit = useMutation(
    async (params: any) => {

      try {
        const response = await fruitServices.handleCreateFruit(params);

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {

          enqueueSnackbar(LANG_MESS.MES_CREATE_FRUIT_SUCCESS, {
            variant: 'success',
            autoHideDuration: 3000,
          });
          router.push("/fruit");
        }
        else {
          enqueueSnackbar(LANG_MESS.MES_CREATE_FRUIT_ERR, {
            variant: 'error',
            autoHideDuration: 3000,
          });
        }
      },
    },
  );

  return {
    onCreateFruit: handleCreateFruit.mutate
  };
};