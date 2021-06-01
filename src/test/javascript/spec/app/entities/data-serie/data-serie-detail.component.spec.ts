import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { DataSerieDetailComponent } from 'app/entities/data-serie/data-serie-detail.component';
import { DataSerie } from 'app/shared/model/data-serie.model';

describe('Component Tests', () => {
  describe('DataSerie Management Detail Component', () => {
    let comp: DataSerieDetailComponent;
    let fixture: ComponentFixture<DataSerieDetailComponent>;
    const route = ({ data: of({ dataSerie: new DataSerie(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [DataSerieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DataSerieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DataSerieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load dataSerie on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dataSerie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
