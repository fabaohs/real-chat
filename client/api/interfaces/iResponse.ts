export interface iResponse<T> {
  type: string;
  title: string;
  status: string;
  detail: string;
  instance: string;
  data?: T;
}
