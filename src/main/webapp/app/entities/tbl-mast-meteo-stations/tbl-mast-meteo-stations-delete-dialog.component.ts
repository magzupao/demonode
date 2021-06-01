import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';
import { TblMastMeteoStationsService } from './tbl-mast-meteo-stations.service';

@Component({
  templateUrl: './tbl-mast-meteo-stations-delete-dialog.component.html'
})
export class TblMastMeteoStationsDeleteDialogComponent {
  tblMastMeteoStations?: ITblMastMeteoStations;

  constructor(
    protected tblMastMeteoStationsService: TblMastMeteoStationsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tblMastMeteoStationsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tblMastMeteoStationsListModification');
      this.activeModal.close();
    });
  }
}
