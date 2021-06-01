import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDataSerie } from 'app/shared/model/data-serie.model';

type EntityResponseType = HttpResponse<IDataSerie>;
type EntityArrayResponseType = HttpResponse<IDataSerie[]>;

@Injectable({ providedIn: 'root' })
export class DataSerieService {
  public resourceUrl = SERVER_API_URL + 'api/data-series';

  constructor(protected http: HttpClient) {}

  create(dataSerie: IDataSerie): Observable<EntityResponseType> {
    return this.http.post<IDataSerie>(this.resourceUrl, dataSerie, { observe: 'response' });
  }

  update(dataSerie: IDataSerie): Observable<EntityResponseType> {
    return this.http.put<IDataSerie>(this.resourceUrl, dataSerie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDataSerie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IDataSerie[]>(`${this.resourceUrl}/findAll/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDataSerie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
