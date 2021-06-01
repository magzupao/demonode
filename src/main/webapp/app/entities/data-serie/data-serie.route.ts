import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDataSerie, DataSerie } from 'app/shared/model/data-serie.model';
import { DataSerieService } from './data-serie.service';
import { DataSerieComponent } from './data-serie.component';
import { DataSerieDetailComponent } from './data-serie-detail.component';
import { DataSerieUpdateComponent } from './data-serie-update.component';

@Injectable({ providedIn: 'root' })
export class DataSerieResolve implements Resolve<IDataSerie> {
  constructor(private service: DataSerieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDataSerie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dataSerie: HttpResponse<DataSerie>) => {
          if (dataSerie.body) {
            return of(dataSerie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DataSerie());
  }
}

export const dataSerieRoute: Routes = [
  {
    path: '',
    component: DataSerieComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DataSeries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DataSerieDetailComponent,
    resolve: {
      dataSerie: DataSerieResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DataSeries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DataSerieUpdateComponent,
    resolve: {
      dataSerie: DataSerieResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DataSeries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DataSerieUpdateComponent,
    resolve: {
      dataSerie: DataSerieResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DataSeries'
    },
    canActivate: [UserRouteAccessService]
  }
];
