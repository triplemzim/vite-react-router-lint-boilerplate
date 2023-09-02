/* eslint-disable */

import axios from "axios";
import { getCookie } from "./cookieParser";
// import { assoc } from "ramda";
// import { getEncryptedCookie, getValueByKey } from "../utils/helpers";
axios.defaults.withCredentials = true;


export default class Axios {
  get(options: any) {
    options.method = "get";

    const { headers } = options ?? {};
    const { Authorization } = headers ?? {};

    options.headers = headers
      ? {
          ...headers,
          Authorization: Authorization
            ? Authorization
            : `Bearer ${getCookie("authToken")}`,
        }
      : this.getHeaders();
    return new Promise((resolve, reject) => {
      axios
        .get(options.url, options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  post(options: any) {
    options.method = "POST";

    const { headers } = options ?? {};
    const { Authorization } = headers ?? {};

    options.headers = headers
      ? {
          ...headers,
          Authorization: Authorization
            ? Authorization
            : `Bearer ${getCookie("authToken")}`,
        }
      : this.getHeaders();
    options.timeout = 1000 * 500;
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  upload(options: any) {
    options.method = "POST";
    options.headers = this.getHeaders();
    options.headers["content-type"] = "multipart/form-data";
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  patch(options: any) {
    options.method = "PATCH";
    options.headers = this.getHeaders();
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  put(options: any) {
    options.method = "PUT";
    options.headers = this.getHeaders();
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  delete(options: any) {
    options.method = "DELETE";
    options.headers = this.getHeaders();
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getHeaders() {
    return {
      Authorization: `Bearer ${getCookie("authToken")}`,
    };
  }
}

// module.exports = axios1;

// export class RequestCancellation {
//   constructor() {
//     this.cancelTokens = {};
//   }

//   setCancelTokens(apiName, cancel) {
//     this.cancelTokens = assoc(apiName, cancel, this.cancelTokens);
//   }

//   getCancelToken(apiName, shouldCancel = true) {
//     const cancel = getValueByKey(this.cancelTokens, apiName);
//     if (cancel && shouldCancel) cancel();
//     const cancelToken = new axios.CancelToken((c) => {
//       this.setCancelTokens(apiName, c);
//     });
//     return cancelToken;
//   }

//   cancelAllRequests() {
//     Object.keys(this.cancelTokens).forEach((tokenKey) => {
//       let cancel = getValueByKey(this.cancelTokens, tokenKey);
//       if (cancel) cancel();
//     });
//   }
// }

// export const requestCancellation = new RequestCancellation();
