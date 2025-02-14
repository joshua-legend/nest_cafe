export type ResponseSuccessAPI<T> = {
  isSuccess: true;
  message: string;
  data?: T;
};
export class ResponseSuccess<T> implements ResponseSuccessAPI<T> {
  public isSuccess: true = true;
  public message: string;
  public data?: T;

  constructor(message: string, data?: T) {
    this.message = message;
    this.data = data;
  }
}

export type ResponseFailAPI = {
  isSuccess: false;
  message: string;
  statusCode: 400;
};

export class ResponseFail implements ResponseFailAPI {
  public isSuccess: false = false;
  public message: string;
  public statusCode: 400;
  constructor(message: string) {
    this.message = message;
  }
}

export type ResponseStrategy<T> = (data: T) => ResponseSuccessAPI<T> | ResponseFailAPI;
