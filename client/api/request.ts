import { iRequestParams } from "./interfaces/iRequestParams";
import { iResponse } from "./interfaces/iResponse";

export async function request<T>({
  url,
  params,
}: iRequestParams): Promise<iResponse<T>> {
  return await fetch(url, params).then(async (res) => await res.json());
}
