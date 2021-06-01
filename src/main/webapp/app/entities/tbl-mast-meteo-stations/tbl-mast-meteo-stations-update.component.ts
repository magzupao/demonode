import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITblMastMeteoStations, TblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';
import { TblMastMeteoStationsService } from './tbl-mast-meteo-stations.service';

@Component({
  selector: 'jhi-tbl-mast-meteo-stations-update',
  templateUrl: './tbl-mast-meteo-stations-update.component.html'
})
export class TblMastMeteoStationsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    latitude: [null, [Validators.required]]
  });

  constructor(
    protected tblMastMeteoStationsService: TblMastMeteoStationsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tblMastMeteoStations }) => {
      this.updateForm(tblMastMeteoStations);
    });
  }

  updateForm(tblMastMeteoStations: ITblMastMeteoStations): void {
    this.editForm.patchValue({
      id: tblMastMeteoStations.id,
      name: tblMastMeteoStations.name,
      longitude: tblMastMeteoStations.longitude,
      latitude: tblMastMeteoStations.latitude
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tblMastMeteoStations = this.createFromForm();
    if (tblMastMeteoStations.id !== undefined) {
      this.subscribeToSaveResponse(this.tblMastMeteoStationsService.update(tblMastMeteoStations));
    } else {
      this.subscribeToSaveResponse(this.tblMastMeteoStationsService.create(tblMastMeteoStations));
    }
  }

  private createFromForm(): ITblMastMeteoStations {
    return {
      ...new TblMastMeteoStations(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      latitude: this.editForm.get(['latitude'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITblMastMeteoStations>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
