import {create} from '../api';

type GaiaServerResponse = {
  data: unknown;
  error: Error;
};

const apiInstance = create<GaiaServerResponse>();

export const {api} = apiInstance;

const {setAcceptLanguage, setAuthorization} = apiInstance;

export default {
  setAcceptLanguage,
  setAuthorization,
};
