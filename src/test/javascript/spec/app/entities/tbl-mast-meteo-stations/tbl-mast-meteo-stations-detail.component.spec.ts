import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { TblMastMeteoStationsDetailComponent } from 'app/entities/tbl-mast-meteo-stations/tbl-mast-meteo-stations-detail.component';
import { TblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';

describe('Component Tests', () => {
  describe('TblMastMeteoStations Management Detail Component', () => {
    let comp: TblMastMeteoStationsDetailComponent;
    let fixture: ComponentFixture<TblMastMeteoStationsDetailComponent>;
    const route = ({ data: of({ tblMastMeteoStations: new TblMastMeteoStations(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [TblMastMeteoStationsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TblMastMeteoStationsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TblMastMeteoStationsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tblMastMeteoStations on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tblMastMeteoStations).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
