import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDataSerie } from 'app/shared/model/data-serie.model';

@Component({
  selector: 'jhi-data-serie-detail',
  templateUrl: './data-serie-detail.component.html'
})
export class DataSerieDetailComponent implements OnInit {
  dataSerie: IDataSerie | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dataSerie }) => (this.dataSerie = dataSerie));
  }

  previousState(): void {
    window.history.back();
  }
}
