import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CodechallengemarcoSharedModule } from 'app/shared/shared.module';
import { TblMastMeteoStationsComponent } from './tbl-mast-meteo-stations.component';
import { TblMastMeteoStationsDetailComponent } from './tbl-mast-meteo-stations-detail.component';
import { TblMastMeteoStationsUpdateComponent } from './tbl-mast-meteo-stations-update.component';
import { TblMastMeteoStationsDeleteDialogComponent } from './tbl-mast-meteo-stations-delete-dialog.component';
import { tblMastMeteoStationsRoute } from './tbl-mast-meteo-stations.route';

@NgModule({
  imports: [CodechallengemarcoSharedModule, RouterModule.forChild(tblMastMeteoStationsRoute)],
  declarations: [
    TblMastMeteoStationsComponent,
    TblMastMeteoStationsDetailComponent,
    TblMastMeteoStationsUpdateComponent,
    TblMastMeteoStationsDeleteDialogComponent
  ],
  entryComponents: [TblMastMeteoStationsDeleteDialogComponent]
})
export class CodechallengemarcoTblMastMeteoStationsModule {}
