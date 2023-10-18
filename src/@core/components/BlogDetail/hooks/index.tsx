import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { checkSuccessRequest } from "src/service/api";
import blogServices from "src/service/blog";

export const useBlogDetail = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const handleFetchBlogById = async () => {

    try {
      const response = await blogServices.handleFetchBlogById(id);

      return response?.data
    } catch (error) {
      throw error;
    }
  }
  const useQueryGetBlogById: UseQueryResult = useQuery(['getBlogDetail',id], handleFetchBlogById, {
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
    onGetBlogById: useQueryGetBlogById,
    refetchBlogById: useQueryGetBlogById.refetch,
  };
};

export const useUpdateBlogDetail = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleUpdateBlogCategory = useMutation(
    async (params: any) => {
      console.log(params);
      
      try {
        const response = await blogServices.handleUpdateBlog(params);

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {

          enqueueSnackbar(LANG_MESS.MES_EDIT_BLOG_SUCCESS, {
            variant: 'success',
            autoHideDuration: 2000,
          });
          router.push('/blog')
        }
        else {
          enqueueSnackbar(LANG_MESS.MES_EDIT_BLOG_ERR, {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      },
    },
  );

  return {
    onUpdateFruitCategory: handleUpdateBlogCategory.mutate,
  };
};