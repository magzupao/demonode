import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITblMastMeteoVariables, TblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';
import { TblMastMeteoVariablesService } from './tbl-mast-meteo-variables.service';
import { TblMastMeteoVariablesComponent } from './tbl-mast-meteo-variables.component';
import { TblMastMeteoVariablesDetailComponent } from './tbl-mast-meteo-variables-detail.component';
import { TblMastMeteoVariablesUpdateComponent } from './tbl-mast-meteo-variables-update.component';

@Injectable({ providedIn: 'root' })
export class TblMastMeteoVariablesResolve implements Resolve<ITblMastMeteoVariables> {
  constructor(private service: TblMastMeteoVariablesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITblMastMeteoVariables> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tblMastMeteoVariables: HttpResponse<TblMastMeteoVariables>) => {
          if (tblMastMeteoVariables.body) {
            return of(tblMastMeteoVariables.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TblMastMeteoVariables());
  }
}

export const tblMastMeteoVariablesRoute: Routes = [
  {
    path: '',
    component: TblMastMeteoVariablesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'TblMastMeteoVariables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TblMastMeteoVariablesDetailComponent,
    resolve: {
      tblMastMeteoVariables: TblMastMeteoVariablesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblMastMeteoVariables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TblMastMeteoVariablesUpdateComponent,
    resolve: {
      tblMastMeteoVariables: TblMastMeteoVariablesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblMastMeteoVariables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TblMastMeteoVariablesUpdateComponent,
    resolve: {
      tblMastMeteoVariables: TblMastMeteoVariablesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblMastMeteoVariables'
    },
    canActivate: [UserRouteAccessService]
  }
];
