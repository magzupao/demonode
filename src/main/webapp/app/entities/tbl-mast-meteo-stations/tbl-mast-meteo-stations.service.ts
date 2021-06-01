import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';

type EntityResponseType = HttpResponse<ITblMastMeteoStations>;
type EntityArrayResponseType = HttpResponse<ITblMastMeteoStations[]>;

@Injectable({ providedIn: 'root' })
export class TblMastMeteoStationsService {
  public resourceUrl = SERVER_API_URL + 'api/tbl-mast-meteo-stations';

  constructor(protected http: HttpClient) {}

  create(tblMastMeteoStations: ITblMastMeteoStations): Observable<EntityResponseType> {
    return this.http.post<ITblMastMeteoStations>(this.resourceUrl, tblMastMeteoStations, { observe: 'response' });
  }

  update(tblMastMeteoStations: ITblMastMeteoStations): Observable<EntityResponseType> {
    return this.http.put<ITblMastMeteoStations>(this.resourceUrl, tblMastMeteoStations, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITblMastMeteoStations>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITblMastMeteoStations[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
