import { useSnackbar } from "notistack";
import { useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { checkSuccessRequest } from "src/service/api";
import fruitServices from "src/service/fruit";

export const useFruit = (params: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchFruitCategory = async () => {

    try {
      const response = await fruitServices.handleFetchFruitCategory(params);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetFruit: UseQueryResult = useQuery(['getFruit', params], handleFetchFruitCategory, {
    refetchOnWindowFocus: false,
    enabled: !!params,
    onSuccess: (res: any) => {

      if (checkSuccessRequest(res)) {
        setData(res?.data?.items)
      }
      else {
        enqueueSnackbar("Error", {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    },
  });

  return {
    data: data,
    onGetFruit: useQueryGetFruit,
    refetchFruit: useQueryGetFruit.refetch,
  };
};

export const useFruitDelete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFruit = useMutation(
    async (param: any) => {

      try {
        const response = await fruitServices.handleDeleteFruitCategory(param.id);
        const onRefetch = param?.onRefetch;

        return { response ,onRefetch}
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {
          res.onRefetch();
          enqueueSnackbar(LANG_MESS.MES_DEL_FRUIT_SUCCESS, {
            variant: 'success',
            autoHideDuration: 2000,
          });
        }
        else {
          enqueueSnackbar(LANG_MESS.MES_DEL_FRUIT_ERROR, {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      },
    },
  );

  return {
    onDeleteFruit: handleDeleteFruit.mutate
  };
};