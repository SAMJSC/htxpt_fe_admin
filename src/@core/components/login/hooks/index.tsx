import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { KEY_STORAGE } from "src/constants/common";
import { routerURL } from "src/navigation/router";
import { checkSuccessRequest, getToken } from "src/service/api";
import loginServices from "src/service/login";

export const useLogin = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleLogin = useMutation(
    async (params: any) => {

      try {
        const response = await loginServices.handleLogin(params);

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {
console.log(res?.response?.data);

          const token = res?.response?.data?.data?.session?.accessToken;
          const refreshToken = res?.response?.data?.data?.session?.refreshToken;

          getToken(token);
          Cookies.set(KEY_STORAGE.TOKEN, token, { sameSite: 'strict' });
          Cookies.set(KEY_STORAGE.REFRESH_TOKEN, refreshToken);
          enqueueSnackbar("Login Successfully!", {
            variant: 'success',
            autoHideDuration: 2000,
          });
          router.push("/");
        }
        else {
          enqueueSnackbar("User Name or Pass Word Invalid!", {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      },
    },
  );

  return {
    onLogin: handleLogin.mutate,
  };
};

export const useLogout = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = useMutation(
    async () => {
      try {
        const response = await loginServices.handleLogout();

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {

        if (checkSuccessRequest(res?.response?.data)) {

          Cookies.remove(KEY_STORAGE.TOKEN)
          Cookies.remove(KEY_STORAGE.REFRESH_TOKEN)
          enqueueSnackbar("Logout Successfully!", {
            variant: 'success',
            autoHideDuration: 2000,
          });
          router.push(routerURL.LOGIN);
        }
        else {
          // ShowMessage(TYPE_CONSTANTS.MESSAGE.ERROR, "Login fail !");
        }
      },
    },
  );

  return {
    onLogout: handleLogout.mutate,
  };
};