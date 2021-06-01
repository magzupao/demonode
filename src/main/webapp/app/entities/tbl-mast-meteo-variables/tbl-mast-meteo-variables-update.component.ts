import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITblMastMeteoVariables, TblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';
import { TblMastMeteoVariablesService } from './tbl-mast-meteo-variables.service';

@Component({
  selector: 'jhi-tbl-mast-meteo-variables-update',
  templateUrl: './tbl-mast-meteo-variables-update.component.html'
})
export class TblMastMeteoVariablesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    unit: [null, [Validators.required]]
  });

  constructor(
    protected tblMastMeteoVariablesService: TblMastMeteoVariablesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tblMastMeteoVariables }) => {
      this.updateForm(tblMastMeteoVariables);
    });
  }

  updateForm(tblMastMeteoVariables: ITblMastMeteoVariables): void {
    this.editForm.patchValue({
      id: tblMastMeteoVariables.id,
      name: tblMastMeteoVariables.name,
      unit: tblMastMeteoVariables.unit
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tblMastMeteoVariables = this.createFromForm();
    if (tblMastMeteoVariables.id !== undefined) {
      this.subscribeToSaveResponse(this.tblMastMeteoVariablesService.update(tblMastMeteoVariables));
    } else {
      this.subscribeToSaveResponse(this.tblMastMeteoVariablesService.create(tblMastMeteoVariables));
    }
  }

  private createFromForm(): ITblMastMeteoVariables {
    return {
      ...new TblMastMeteoVariables(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      unit: this.editForm.get(['unit'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITblMastMeteoVariables>>): void {
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
