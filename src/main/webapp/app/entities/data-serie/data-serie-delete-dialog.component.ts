import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDataSerie } from 'app/shared/model/data-serie.model';
import { DataSerieService } from './data-serie.service';

@Component({
  templateUrl: './data-serie-delete-dialog.component.html'
})
export class DataSerieDeleteDialogComponent {
  dataSerie?: IDataSerie;

  constructor(protected dataSerieService: DataSerieService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dataSerieService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dataSerieListModification');
      this.activeModal.close();
    });
  }
}
