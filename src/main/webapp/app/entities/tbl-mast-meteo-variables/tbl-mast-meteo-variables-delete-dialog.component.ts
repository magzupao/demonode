import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';
import { TblMastMeteoVariablesService } from './tbl-mast-meteo-variables.service';

@Component({
  templateUrl: './tbl-mast-meteo-variables-delete-dialog.component.html'
})
export class TblMastMeteoVariablesDeleteDialogComponent {
  tblMastMeteoVariables?: ITblMastMeteoVariables;

  constructor(
    protected tblMastMeteoVariablesService: TblMastMeteoVariablesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tblMastMeteoVariablesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tblMastMeteoVariablesListModification');
      this.activeModal.close();
    });
  }
}
