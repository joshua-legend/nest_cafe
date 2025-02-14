import { ResponseFail, ResponseFailAPI, ResponseStrategy, ResponseSuccess, ResponseSuccessAPI } from './response.types';

export type DataPredicate<T> = (data: T) => boolean;

export const createResponse =
  <T>(predicate: DataPredicate<T>, successMsg: string, failMsg: string): ResponseStrategy<T> =>
  (data: T) =>
    predicate(data) ? new ResponseSuccess<T>(successMsg, data) : new ResponseFail(failMsg);
