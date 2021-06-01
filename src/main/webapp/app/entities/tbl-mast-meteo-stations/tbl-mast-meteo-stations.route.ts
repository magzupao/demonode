import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITblMastMeteoStations, TblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';
import { TblMastMeteoStationsService } from './tbl-mast-meteo-stations.service';
import { TblMastMeteoStationsComponent } from './tbl-mast-meteo-stations.component';
import { TblMastMeteoStationsDetailComponent } from './tbl-mast-meteo-stations-detail.component';
import { TblMastMeteoStationsUpdateComponent } from './tbl-mast-meteo-stations-update.component';

@Injectable({ providedIn: 'root' })
export class TblMastMeteoStationsResolve implements Resolve<ITblMastMeteoStations> {
  constructor(private service: TblMastMeteoStationsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITblMastMeteoStations> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tblMastMeteoStations: HttpResponse<TblMastMeteoStations>) => {
          if (tblMastMeteoStations.body) {
            return of(tblMastMeteoStations.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TblMastMeteoStations());
  }
}

export const tblMastMeteoStationsRoute: Routes = [
  {
    path: '',
    component: TblMastMeteoStationsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'TblMastMeteoStations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TblMastMeteoStationsDetailComponent,
    resolve: {
      tblMastMeteoStations: TblMastMeteoStationsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblMastMeteoStations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TblMastMeteoStationsUpdateComponent,
    resolve: {
      tblMastMeteoStations: TblMastMeteoStationsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblMastMeteoStations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TblMastMeteoStationsUpdateComponent,
    resolve: {
      tblMastMeteoStations: TblMastMeteoStationsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblMastMeteoStations'
    },
    canActivate: [UserRouteAccessService]
  }
];
