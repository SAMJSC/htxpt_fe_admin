import { useSnackbar } from "notistack";
import { useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { checkSuccessRequest } from "src/service/api";
import blogServices from "src/service/blog";

export const useBlog = (params: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchBlog = async () => {

    try {
      const response = await blogServices.handleFetchBlog(params);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetBlog: UseQueryResult = useQuery(['getBlog', params], handleFetchBlog, {
    refetchOnWindowFocus: false,
    enabled: !!params,
    onSuccess: (res: any) => {
      console.log("Res: ",res);
      
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
    onGetBlog: useQueryGetBlog,
    refetchBlog: useQueryGetBlog.refetch,
  };
};

export const useBlogDelete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBlog = useMutation(
    async (param: any) => {

      try {
        const response = await blogServices.handleDeleteBlog(param.id);
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
          enqueueSnackbar(LANG_MESS.MES_DEL_BLOG_SUCCESS, {
            variant: 'success',
            autoHideDuration: 2000,
          });
        }
        else {
          enqueueSnackbar(LANG_MESS.MES_DEL_BLOG_ERROR, {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      },
    },
  );

  return {
    onDeleteBlog: handleDeleteBlog.mutate
  };
};