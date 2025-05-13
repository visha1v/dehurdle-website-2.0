import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { API, API_TIMEOUT, ApiMethod, LocalStorageKeys } from 'constant';
import { setLocalStorageValue } from 'utils';

import { firebaseAuth } from './firebase-service';

export class APIService {
  axiosClient: Axios;

  static instance: APIService;

  /**
   *
   * create axios instance and configure interceptors
   */
  constructor() {
    this.axiosClient = axios.create();
    this.configureInterceptors();
  }

  /**
   * @returns instance of APIService class
   */
  static readonly getInstance = async () => {
    if (!this.instance) {
      this.instance = new APIService();
    }
    if (firebaseAuth?.currentUser) {
      const user = firebaseAuth.currentUser;
      if (user) {
        await user
          .getIdToken()
          .then((idToken: string) => {
            this.updateAuthToken(idToken);
          })
          .catch(function (error: unknown) {
            console.error('Error while getting api instance :', error);
          });
      }
    }
    return this.instance;
  };

  /**
   * To add additional headers API call
   * @static
   * @memberof ApiService
   */
  static readonly addAdditionalHeaders = (headers = {}) => {
    API.config.headers = { ...API.config.headers, ...headers };
  };

  /**
   * Updates the auth token
   */

  static readonly updateAuthToken = async (token: string) => {
    if (token) {
      API.config.headers = { ...API.config.headers, Authorization: `Bearer ${token}` };
      setLocalStorageValue(LocalStorageKeys.AuthToken, token);
    } else {
      API.config.headers = { ...API.config.headers, Authorization: '' };
    }
  };

  /**
   *
   * @param error required AxiosError
   * @returns error object
   */
  private readonly errorHandler = async (error: AxiosError) => {
    const { response, code, message } = error;

    return {
      data: response?.data,
      status: code,
      statusText: message,
    };
  };

  /**
   *
   * @param response required AxiosResponse
   * @returns response object
   */
  private readonly successHandler = (response: AxiosResponse) => {
    const { status, statusText } = response;
    return {
      data: response.data,
      status,
      statusText,
    };
  };

  /**
   *
   * setup interceptors: intercepts api response
   */
  private readonly configureInterceptors = () => {
    this.axiosClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return this.successHandler(response) as AxiosResponse;
      },
      (error: AxiosError) => this.errorHandler(error),
    );

    this.axiosClient.interceptors.request.use((request: any) => request);
  };

  /**
   *
   * @param apiPath required apiPath (endpoints)
   * @returns api response
   */
  get = async (apiPath: string) => {
    const source = axios.CancelToken.source();
    const timeout = setTimeout(source.cancel, API_TIMEOUT);
    const res = await this.axiosClient.get(apiPath, {
      headers: API.config.headers,
      cancelToken: source.token,
    });
    console.info('GET', { apiPath, res });
    clearTimeout(timeout);
    return { ...res, type: ApiMethod.Get };
  };

  /**
   *
   * @param apiPath required apiPath (endpoints)
   * TODO: we don't have the perfect type for payload
   * @param payload required payload
   * @returns api response
   */
  delete = async (apiPath: string, payload: any) => {
    const res = await this.axiosClient.delete(apiPath, { data: payload });
    console.info('DELETE', { apiPath, payload, res });
    return { ...res, type: ApiMethod.Delete };
  };

  /**
   * @param apiPath required apiPath (endpoints)
   * TODO: we don't have the perfect type for payload
   * @param payload required payload
   * @returns api response
   */
  post = async (apiPath: string, payload: any) => {
    const res = await this.axiosClient.post(apiPath, payload, {
      headers: API.config.headers,
    });
    console.info('POST', { apiPath, payload, res });
    return res;
  };

  /**
   *
   * @param apiPath required apiPath (endpoints)
   * TODO: we don't have the perfect type for payload
   * @param payload required payload
   * @returns api response
   */
  put = async (apiPath: string, payload: any) => {
    const res = await this.axiosClient.put(apiPath, payload, { headers: API.config.headers });
    console.info('PUT', { apiPath, payload, res });
    return { ...res, type: ApiMethod.Put };
  };

  /**
   *
   * @param apiPath required apiPath (endpoints)
   * TODO: we don't have the perfect type for payload
   * @param payload required payload
   * @returns api response
   */
  patch = async (apiPath: string, payload: any) => {
    const res = await this.axiosClient.patch(apiPath, payload, { headers: API.config.headers });
    console.info('PATCH', { apiPath, payload, res });
    return { ...res, type: ApiMethod.Patch };
  };
}
