import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CodechallengemarcoSharedModule } from 'app/shared/shared.module';
import { DataSerieComponent } from './data-serie.component';
import { DataSerieDetailComponent } from './data-serie-detail.component';
import { DataSerieUpdateComponent } from './data-serie-update.component';
import { DataSerieDeleteDialogComponent } from './data-serie-delete-dialog.component';
import { dataSerieRoute } from './data-serie.route';

@NgModule({
  imports: [CodechallengemarcoSharedModule, RouterModule.forChild(dataSerieRoute)],
  declarations: [DataSerieComponent, DataSerieDetailComponent, DataSerieUpdateComponent, DataSerieDeleteDialogComponent],
  entryComponents: [DataSerieDeleteDialogComponent]
})
export class CodechallengemarcoDataSerieModule {}
