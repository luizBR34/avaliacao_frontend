import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Dados } from '../model/dados';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class BackService {

  constructor(private http: HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

    getDados(): Observable<Dados[]> {
      return this.http.get<Dados[]>(baseURL)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }

    postCadastraDados(d: Dados): Observable<{}> {
      const url = `${baseURL}/cadastrar/`;
      return this.http.post<{}>(url, d, httpOptions)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }

}
