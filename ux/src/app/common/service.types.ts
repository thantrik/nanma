export type WebResponse = Response & {
  json: any;
  text: string;
  body: string;
  html: string;
  error: boolean;
  ok: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
};
