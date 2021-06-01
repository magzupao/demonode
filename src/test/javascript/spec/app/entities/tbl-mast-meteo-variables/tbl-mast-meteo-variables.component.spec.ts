import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { TblMastMeteoVariablesComponent } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables.component';
import { TblMastMeteoVariablesService } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables.service';
import { TblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';

describe('Component Tests', () => {
  describe('TblMastMeteoVariables Management Component', () => {
    let comp: TblMastMeteoVariablesComponent;
    let fixture: ComponentFixture<TblMastMeteoVariablesComponent>;
    let service: TblMastMeteoVariablesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [TblMastMeteoVariablesComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(TblMastMeteoVariablesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TblMastMeteoVariablesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TblMastMeteoVariablesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TblMastMeteoVariables(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tblMastMeteoVariables && comp.tblMastMeteoVariables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TblMastMeteoVariables(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tblMastMeteoVariables && comp.tblMastMeteoVariables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
