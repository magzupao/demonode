import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CodechallengemarcoSharedModule } from 'app/shared/shared.module';
import { TblMastMeteoVariablesComponent } from './tbl-mast-meteo-variables.component';
import { TblMastMeteoVariablesDetailComponent } from './tbl-mast-meteo-variables-detail.component';
import { TblMastMeteoVariablesUpdateComponent } from './tbl-mast-meteo-variables-update.component';
import { TblMastMeteoVariablesDeleteDialogComponent } from './tbl-mast-meteo-variables-delete-dialog.component';
import { tblMastMeteoVariablesRoute } from './tbl-mast-meteo-variables.route';

@NgModule({
  imports: [CodechallengemarcoSharedModule, RouterModule.forChild(tblMastMeteoVariablesRoute)],
  declarations: [
    TblMastMeteoVariablesComponent,
    TblMastMeteoVariablesDetailComponent,
    TblMastMeteoVariablesUpdateComponent,
    TblMastMeteoVariablesDeleteDialogComponent
  ],
  entryComponents: [TblMastMeteoVariablesDeleteDialogComponent]
})
export class CodechallengemarcoTblMastMeteoVariablesModule {}
