import { useSnackbar } from "notistack";
import { useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { checkSuccessRequest } from "src/service/api";
import bonsaiServices from "src/service/bonsai";
import fruitServices from "src/service/fruit";

export const useFruitDetailOfGarden = (id: string | undefined) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchFruitOfGardenerById = async () => {

    try {
      const response = await fruitServices.handleFetchFruitOfGardenerById(id);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetFruitOfGardenById: UseQueryResult = useQuery(['getFruitOfGardenDetail',id], handleFetchFruitOfGardenerById, {
    refetchOnWindowFocus: false,
    enabled: !!id,
    onSuccess: (res: any) => {
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
    onGetFruitOfGardenById: useQueryGetFruitOfGardenById,
    refetchFruitOfGardenById: useQueryGetFruitOfGardenById.refetch,
  };
};

export const useBonsaiDetailOfGarden = (id: string | undefined) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchBonsaiOfGardenerById = async () => {

    try {
      const response = await bonsaiServices.handleFetchBonsaiOfGardenerById(id);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetBonsaiOfGardenById: UseQueryResult = useQuery(['getBonsaiOfGardenDetail',id], handleFetchBonsaiOfGardenerById, {
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
    onGetBonsaiOfGardenById: useQueryGetBonsaiOfGardenById,
    refetchBonsaiOfGardenById: useQueryGetBonsaiOfGardenById.refetch,
  };
};