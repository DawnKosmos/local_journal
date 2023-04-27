import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url = "http://localhost:8080"
  debug = true;

  get<T>(root : string, params? : any) : Observable<T>{
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      }); 
    }
    if (this.debug){
      console.log("GET", root, httpParams)
    }

    return this.http.get<T>(this.url+root, { params: httpParams }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(root : string, params? : any) : Observable<T>{
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    if (this.debug){
      console.log("POST", root, httpParams)
    }

    return this.http.post<T>(this.url+root, httpParams).pipe(
      catchError(this.handleError)
    );
  }

  postJson<T>(root : string, data : any) : Observable<T>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (this.debug){
      console.log("POST JSON",root, data)
    }
    return this.http.post<T>(this.url+root, data,{headers}).pipe(
      catchError(this.handleError)
    )
  }



  constructor(private http: HttpClient){}

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (typeof error.error === 'string') {
      const customError: CustomError = {
        code: error.status,
        msg: error.error
      };
      return throwError(() => customError);
    } else {
      const customError: CustomError = {
        code: error.status,
        msg: error.message
      };
      return throwError(() => customError);
    }
  }
}


export interface CustomError {
  code: number;
  msg: string;
}
