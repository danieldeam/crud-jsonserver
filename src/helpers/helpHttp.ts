import OPTIONS from "./options.model";

export const helpHttp = () => {
  const customFetch = (endPoint: string, options: OPTIONS) => {
    const defaultHeaders = {
      accept: "application/json",
    };
  const controller = new AbortController();
  options.signal = controller.signal;

  options.method = options.method || "GET";
  options.headers = options.headers?
  ({...defaultHeaders, ...options.headers}):(defaultHeaders);

  options.body = JSON.stringify(options.body) || false;
  if(!options.body) delete options.body;

  setTimeout(()=> controller.abort(), 3000)

  return fetch(endPoint, options)
   .then((res)=>res.ok ? res.json(): Promise.reject({
    err: true,
    status: res.status || "00",
    statusText: res.statusText || "Error en la petición"
  })).catch((err)=> err);
  };

  const get = (url: string, options = {}) => customFetch(url, options);
  const post = (url: string, options: any = {})=> {
    options.method = "POST";
    return customFetch(url, options);
  };
  const put = (url: string, options: any= {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };
  const del = (url: string, options: any = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
