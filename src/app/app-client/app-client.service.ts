import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from '../data/services/request.service';
import { environment } from '../../environments/environment';
import { SuccessResponse } from '../data/models/SucccessResponse.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppClientService {
  private static readonly DEFAULT_POST_HEADERS = {
    'Content-Type': 'application/json',
  };

  constructor(private requestService: RequestService) {}

  get<T>(apiPath: string, body?: any, httpParams?: HttpParams): Observable<T> {
    return this.mapSuccessResponseToData(
      this.requestService.get(
        this.generateRequestUrl(apiPath),
        body,
        httpParams
      )
    );
  }

  post<T>(apiPath: string, body: any, params?: HttpParams): Observable<T> {
    return this.mapSuccessResponseToData(
      this.requestService.post(
        this.generateRequestUrl(apiPath),
        body,
        params,
        this.addDefaultsToHttpHeaders(AppClientService.DEFAULT_POST_HEADERS)
      )
    );
  }

  put<T>(apiPath: string, body: any, params?: HttpParams): Observable<T> {
    return this.mapSuccessResponseToData(
      this.requestService.put(
        this.generateRequestUrl(apiPath),
        body,
        params,
        this.addDefaultsToHttpHeaders(AppClientService.DEFAULT_POST_HEADERS)
      )
    );
  }

  private mapSuccessResponseToData<T>(
    response$: Observable<SuccessResponse<T>>
  ): Observable<T> {
    return response$.pipe(map((response) => response.data));
  }

  private generateRequestUrl(apiPath: string): string {
    return environment.searchApiUrl + apiPath;
  }

  private addDefaultsToHttpHeaders(
    defaults: { [key: string]: string },
    httpHeaders?: HttpHeaders
  ): HttpHeaders {
    const result = httpHeaders == null ? new HttpHeaders() : httpHeaders;
    Object.entries(defaults).forEach(([key, value]) => {
      result.append(key, value);
    });
    return result;
  }
}
