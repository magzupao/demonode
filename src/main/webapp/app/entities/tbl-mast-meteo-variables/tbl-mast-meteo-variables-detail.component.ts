import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';

@Component({
  selector: 'jhi-tbl-mast-meteo-variables-detail',
  templateUrl: './tbl-mast-meteo-variables-detail.component.html'
})
export class TblMastMeteoVariablesDetailComponent implements OnInit {
  tblMastMeteoVariables: ITblMastMeteoVariables | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tblMastMeteoVariables }) => (this.tblMastMeteoVariables = tblMastMeteoVariables));
  }

  previousState(): void {
    window.history.back();
  }
}
