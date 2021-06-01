import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';

type EntityResponseType = HttpResponse<ITblMastMeteoVariables>;
type EntityArrayResponseType = HttpResponse<ITblMastMeteoVariables[]>;

@Injectable({ providedIn: 'root' })
export class TblMastMeteoVariablesService {
  public resourceUrl = SERVER_API_URL + 'api/tbl-mast-meteo-variables';

  constructor(protected http: HttpClient) {}

  create(tblMastMeteoVariables: ITblMastMeteoVariables): Observable<EntityResponseType> {
    return this.http.post<ITblMastMeteoVariables>(this.resourceUrl, tblMastMeteoVariables, { observe: 'response' });
  }

  update(tblMastMeteoVariables: ITblMastMeteoVariables): Observable<EntityResponseType> {
    return this.http.put<ITblMastMeteoVariables>(this.resourceUrl, tblMastMeteoVariables, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITblMastMeteoVariables>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITblMastMeteoVariables[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
