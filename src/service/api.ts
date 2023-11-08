import axios from "axios";
import Cookies from "js-cookie";
import { KEY_STORAGE } from "src/constants/common";
import HTTP_STATUS_CONTSTANTS from 'src/constants/httpStatus';
import TYPE_CONSTANTS from "src/constants/type";
import { routerURL } from "src/navigation/router";
import loginServices from "src/service/login";
import validate from "src/utils/validate";


const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
} as any;

const HEADERS_MULTIPLE_PART = {
  ...HEADERS,
  'Content-Type': 'multipart/form-data; boundary=something',
  Accept: 'application/json',
};

export const getToken = (token: any) => {
  HEADERS['Authorization'] = `Bearer ${token}`;
  HEADERS_MULTIPLE_PART['Authorization'] = `Bearer ${token}`;
};

const getFullUrl = (url: string) => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }

  return `${process.env.NEXT_PUBLIC_APP_API}` + url;
};

export const excludeResponse = ['empty_response'];

export const checkSuccessRequest = (response: any) => {
  Cookies.set(KEY_STORAGE.CODE_TOKEN, response?.statusCode);

  return response?.statusCode < HTTP_STATUS_CONTSTANTS.ERROR;
};

// const checkRefreshToken = async () => {
//   const refresh_token = Cookies.get(KEY_STORAGE.REFRESH_TOKEN);

//   try {
//     const res = await loginServices.handleRefreshToken({ refreshToken: refresh_token });
//     if (res?.statusCode === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401) {

//       Cookies.remove(KEY_STORAGE.TOKEN)
//       Cookies.remove(KEY_STORAGE.REFRESH_TOKEN)
//       if (typeof window !== "undefined") {
//         // Client-side-only code
//         window.location.replace(routerURL.LOGIN)
//       }

//       return false;

//     }
//     else {
//       const token = res?.data?.data?.session?.accessToken;

//       Cookies.set(KEY_STORAGE.TOKEN, token, { sameSite: 'strict' });
//     }

//   } catch (error) {
//     console.log(error);
//   }
// }
const checkErrorStatus = (
  response: any,
  options?: {
    isHideErrorMessage?: any;
  },
) => {

  if (response?.status >= HTTP_STATUS_CONTSTANTS.ERROR && !excludeResponse.includes(response?.data?.code)) {
    Cookies.set(KEY_STORAGE.CODE_TOKEN, response?.status);

    if (HTTP_STATUS_CONTSTANTS.SERVER_ERROR !== response?.status) {
      const resErr = response?.data?.message
      const statusCode = response?.status

      return { typeOfMessage, resErr, statusCode }
    } else {
      !options?.isHideErrorMessage;
    }
  }

  return response;
};
const checkExpiredOrAuthorization = (response: any) => {
  return HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 === response?.statusCode;
};


const api = {
  post: (endpoint: string, params?: any, options?: any) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return response?.data;
          }

          return checkErrorStatus(response, options);
        },
        (err: any) => {
          return checkErrorStatus(err?.response, options);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  postMultiplePart: (endpoint: string, params?: any, options?: any) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return response?.data;
          }

          return checkErrorStatus(response, options);
        },
        (err: any) => {
          return checkErrorStatus(err?.response, options);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  get: (endpoint: string, params: any = {}, options?: any) => {
    return axios
      .get(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return checkErrorStatus(response?.data, options);
          }

          return checkErrorStatus(response, options);
        },
        (err: any) => {
          return checkErrorStatus(err?.response, options);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  put: (endpoint: string, params?: any, options?: any) => {
    return axios
      .put(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return checkErrorStatus(response?.data, options);
          }

          return checkErrorStatus(response, options);
        },
        (err: any) => {
          return checkErrorStatus(err?.response, options);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  patch: (endpoint: string, params?: any, options?: any) => {
    return axios
      .patch(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return checkErrorStatus(response?.data, options);
          }

          return checkErrorStatus(response, options);
        },
        (err: any) => {
          return checkErrorStatus(err?.response, options);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  patchMultipart: (endpoint: string, params?: any, options?: any) => {
    return axios
      .patch(getFullUrl(endpoint), params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return checkErrorStatus(response?.data, options);
          }

          return checkErrorStatus(response, options);
        },
        (err: any) => {
          return checkErrorStatus(err?.response, options);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  delete: (endpoint: string, params?: any, options?: any) => {
    return axios
      .delete(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return response?.data;
          }

          return checkErrorStatus(response, options);
        },
        (err: any) => {
          return checkErrorStatus(err?.response, options);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },
};

const apiCustom = {
  get: (endpoint: string, params: any = {}, options?: any) => {
    return axios
      .get(endpoint, {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (checkExpiredOrAuthorization(response)) {
            return checkErrorStatus(response?.data, options);
          }

          return checkErrorStatus(response?.data, options);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data, options));
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },
};

export { api, apiCustom };

