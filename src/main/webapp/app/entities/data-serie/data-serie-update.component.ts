import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDataSerie, DataSerie } from 'app/shared/model/data-serie.model';
import { DataSerieService } from './data-serie.service';

@Component({
  selector: 'jhi-data-serie-update',
  templateUrl: './data-serie-update.component.html'
})
export class DataSerieUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codStation: [],
    ts: [],
    temp: [],
    wind: [],
    prec: [],
    pres: [],
    hum: []
  });

  constructor(protected dataSerieService: DataSerieService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dataSerie }) => {
      this.updateForm(dataSerie);
    });
  }

  updateForm(dataSerie: IDataSerie): void {
    this.editForm.patchValue({
      id: dataSerie.id,
      codStation: dataSerie.codStation,
      ts: dataSerie.ts,
      temp: dataSerie.temp,
      wind: dataSerie.wind,
      prec: dataSerie.prec,
      pres: dataSerie.pres,
      hum: dataSerie.hum
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dataSerie = this.createFromForm();
    if (dataSerie.id !== undefined) {
      this.subscribeToSaveResponse(this.dataSerieService.update(dataSerie));
    } else {
      this.subscribeToSaveResponse(this.dataSerieService.create(dataSerie));
    }
  }

  private createFromForm(): IDataSerie {
    return {
      ...new DataSerie(),
      id: this.editForm.get(['id'])!.value,
      codStation: this.editForm.get(['codStation'])!.value,
      ts: this.editForm.get(['ts'])!.value,
      temp: this.editForm.get(['temp'])!.value,
      wind: this.editForm.get(['wind'])!.value,
      prec: this.editForm.get(['prec'])!.value,
      pres: this.editForm.get(['pres'])!.value,
      hum: this.editForm.get(['hum'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDataSerie>>): void {
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
