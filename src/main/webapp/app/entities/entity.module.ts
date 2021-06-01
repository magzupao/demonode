import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tbl-mast-meteo-stations',
        loadChildren: () =>
          import('./tbl-mast-meteo-stations/tbl-mast-meteo-stations.module').then(m => m.CodechallengemarcoTblMastMeteoStationsModule)
      },
      {
        path: 'tbl-mast-meteo-variables',
        loadChildren: () =>
          import('./tbl-mast-meteo-variables/tbl-mast-meteo-variables.module').then(m => m.CodechallengemarcoTblMastMeteoVariablesModule)
      },
      {
        path: 'data-serie',
        loadChildren: () => import('./data-serie/data-serie.module').then(m => m.CodechallengemarcoDataSerieModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CodechallengemarcoEntityModule {}
