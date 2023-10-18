import { useSnackbar } from "notistack";
import { useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { checkSuccessRequest } from "src/service/api";
import gardenServices from "src/service/garden";

export const useGardener = (params: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchGarden = async () => {

    try {
      const response = await gardenServices.handleFetchGarden(params);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetGarden: UseQueryResult = useQuery(['getGarden', params], handleFetchGarden, {
    refetchOnWindowFocus: false,
    enabled: !!params,
    onSuccess: (res: any) => {

      if (checkSuccessRequest(res)) {
        setData(res?.data?.items.map((value: any) => (
          {
            ...value,
            full_name: value?.first_name + " " + value?.last_name
          }
        )))
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
    onGetGarden: useQueryGetGarden,
    refetchGarden: useQueryGetGarden.refetch,
  };
};

export const useGardenerDetail = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchGardenById = async () => {

    try {
      const response = await gardenServices.handleFetchGardenById(id);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetGardenById: UseQueryResult = useQuery(['getGardenDetail', id], handleFetchGardenById, {
    refetchOnWindowFocus: false,
    enabled: !!id,
    onSuccess: (res: any) => {

      if (checkSuccessRequest(res)) {
        setData(res?.data?.gardener)
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
    onGetGardenById: useQueryGetGardenById,
    refetchGardenById: useQueryGetGardenById.refetch,
  };
};

export const useDeleteGardener = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = useMutation(
    async (param: any) => {
      try {
        const response = await gardenServices.handleDeleteGarden(param?.id);
        const onRefetch = param?.onRefetch;

        return { response, onRefetch }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {
        if (checkSuccessRequest(res?.response?.data)) {
          res.onRefetch();
          enqueueSnackbar(LANG_MESS.MES_DEL_SUCCESS, {
            variant: 'success',
            autoHideDuration: 2000,
          });
        }
        else {
        }
      },
    },
  );

  return {
    onDeleteGarden: handleDelete.mutate,
  };
};