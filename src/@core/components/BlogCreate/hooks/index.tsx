import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { LANG_MESS } from "src/constants/convertLang";
import { checkSuccessRequest } from "src/service/api";
import blogServices from "src/service/blog";

export const useBlogCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleCreateBlog = useMutation(
    async (params: any) => {

      try {
        const response = await blogServices.handleCreateBlog(params);

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {

          enqueueSnackbar(LANG_MESS.MES_CREATE_BLOG_SUCCESS, {
            variant: 'success',
            autoHideDuration: 2000,
          });
          router.push("/blog");
        }
        else {
          enqueueSnackbar(LANG_MESS.MES_CREATE_BLOG_ERR, {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      },
    },
  );

  return {
    onCreateBlog: handleCreateBlog.mutate
  };
};