import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { DataSerieUpdateComponent } from 'app/entities/data-serie/data-serie-update.component';
import { DataSerieService } from 'app/entities/data-serie/data-serie.service';
import { DataSerie } from 'app/shared/model/data-serie.model';

describe('Component Tests', () => {
  describe('DataSerie Management Update Component', () => {
    let comp: DataSerieUpdateComponent;
    let fixture: ComponentFixture<DataSerieUpdateComponent>;
    let service: DataSerieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [DataSerieUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DataSerieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DataSerieUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DataSerieService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DataSerie(123);
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
        const entity = new DataSerie();
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
