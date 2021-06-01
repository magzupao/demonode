import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { TblMastMeteoVariablesUpdateComponent } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables-update.component';
import { TblMastMeteoVariablesService } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables.service';
import { TblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';

describe('Component Tests', () => {
  describe('TblMastMeteoVariables Management Update Component', () => {
    let comp: TblMastMeteoVariablesUpdateComponent;
    let fixture: ComponentFixture<TblMastMeteoVariablesUpdateComponent>;
    let service: TblMastMeteoVariablesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [TblMastMeteoVariablesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TblMastMeteoVariablesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TblMastMeteoVariablesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TblMastMeteoVariablesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TblMastMeteoVariables(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TblMastMeteoVariables();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
