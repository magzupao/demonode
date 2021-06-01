import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { TblMastMeteoVariablesDetailComponent } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables-detail.component';
import { TblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';

describe('Component Tests', () => {
  describe('TblMastMeteoVariables Management Detail Component', () => {
    let comp: TblMastMeteoVariablesDetailComponent;
    let fixture: ComponentFixture<TblMastMeteoVariablesDetailComponent>;
    const route = ({ data: of({ tblMastMeteoVariables: new TblMastMeteoVariables(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [TblMastMeteoVariablesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TblMastMeteoVariablesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TblMastMeteoVariablesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tblMastMeteoVariables on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tblMastMeteoVariables).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
