import apiClient from "./api-client";

interface Data {
  name: string;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getOne<T>(id: number) {
    return apiClient.get<T>(this.endpoint + "/" + id);
  }

  create<T>(data: Data) {
    return apiClient.post<T>(this.endpoint, data);
  }

  swap<T>() {
    return apiClient.put<T[]>(this.endpoint);
  }

  delete<T>(id: number) {
    return apiClient.delete<T>(this.endpoint + "/" + id);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
