export interface AppErrorResponse {
  message: string;
  errorCode?: string | null;
}
export function isAppErrorResponse(unknown: any): unknown is AppErrorResponse {
  return !!unknown.message;
}
