import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDataSerie } from 'app/shared/model/data-serie.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DataSerieService } from './data-serie.service';
import { DataSerieDeleteDialogComponent } from './data-serie-delete-dialog.component';

@Component({
  selector: 'jhi-data-serie',
  templateUrl: './data-serie.component.html'
})
export class DataSerieComponent implements OnInit, OnDestroy {
  dataSeries: IDataSerie[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected dataSerieService: DataSerieService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
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
    this.dataSerieService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDataSerie[]>) => this.paginateDataSeries(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.dataSeries = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDataSeries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDataSerie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDataSeries(): void {
    this.eventSubscriber = this.eventManager.subscribe('dataSerieListModification', () => this.reset());
  }

  delete(dataSerie: IDataSerie): void {
    const modalRef = this.modalService.open(DataSerieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dataSerie = dataSerie;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
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
