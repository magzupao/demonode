import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ITblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';
import { IDataSerie } from 'app/shared/model/data-serie.model';
import { DataSerieService } from 'app/entities/data-serie/data-serie.service';

@Component({
  selector: 'jhi-tbl-mast-meteo-stations-detail',
  templateUrl: './tbl-mast-meteo-stations-detail.component.html'
})
export class TblMastMeteoStationsDetailComponent implements OnInit {
  tblMastMeteoStations: ITblMastMeteoStations | null = null;
  dataSeries: IDataSerie[];
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  datos?: string[] | undefined;

  constructor(protected dataSerieService: DataSerieService, protected parseLinks: JhiParseLinks, protected activatedRoute: ActivatedRoute) {
    this.dataSeries = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.datos = this.tblMastMeteoStations?.name?.split(' ');
    const strId = this.datos[1];
    const id = Number(strId);
    this.dataSerieService.findAllId(id).subscribe((res: HttpResponse<IDataSerie[]>) => this.paginateDataSeries(res.body, res.headers));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tblMastMeteoStations }) => (this.tblMastMeteoStations = tblMastMeteoStations));
    this.loadAll();
  }

  previousState(): void {
    window.history.back();
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  trackId(index: number, item: IDataSerie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateDataSeries(data: IDataSerie[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.dataSeries.push(data[i]);
      }
    }
  }
}
