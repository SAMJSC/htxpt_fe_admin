import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { checkSuccessRequest } from "src/service/api";
import fruitServices from "src/service/fruit";

export const useFruitDetail = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchFruitById = async () => {

    try {
      const response = await fruitServices.handleFetchFruitById(id);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetFruitById: UseQueryResult = useQuery(['getFruitDetail',id], handleFetchFruitById, {
    refetchOnWindowFocus: false,
    enabled: !!id,
    onSuccess: (res: any) => {
        console.log(res);
      if (checkSuccessRequest(res)) {
        
        setData(res?.data)
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
    onGetFruitById: useQueryGetFruitById,
    refetchFruitById: useQueryGetFruitById.refetch,
  };
};

export const useUpdateFruitDetail = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleUpdateFruitCategory = useMutation(
    async (params: any) => {

      try {
        const response = await fruitServices.handleUpdateFruitCategory(params);

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {

          enqueueSnackbar(LANG_MESS.MES_EDIT_FRUIT_SUCCESS, {
            variant: 'success',
            autoHideDuration: 2000,
          });
          router.push('/fruit')
        }
        else {
          enqueueSnackbar(LANG_MESS.MES_EDIT_FRUIT_ERR, {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      },
    },
  );

  return {
    onUpdateFruitCategory: handleUpdateFruitCategory.mutate,
  };
};