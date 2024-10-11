import {create} from '../api';

type GaiaServerResponse = {
  data: unknown;
  error: Error;
};

const apiInstance = create<GaiaServerResponse>();

export const {api, setAcceptLanguage, setAuthorization} = apiInstance;
