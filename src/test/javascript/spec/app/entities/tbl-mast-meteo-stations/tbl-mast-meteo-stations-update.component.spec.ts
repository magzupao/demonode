import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { TblMastMeteoStationsUpdateComponent } from 'app/entities/tbl-mast-meteo-stations/tbl-mast-meteo-stations-update.component';
import { TblMastMeteoStationsService } from 'app/entities/tbl-mast-meteo-stations/tbl-mast-meteo-stations.service';
import { TblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';

describe('Component Tests', () => {
  describe('TblMastMeteoStations Management Update Component', () => {
    let comp: TblMastMeteoStationsUpdateComponent;
    let fixture: ComponentFixture<TblMastMeteoStationsUpdateComponent>;
    let service: TblMastMeteoStationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [TblMastMeteoStationsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TblMastMeteoStationsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TblMastMeteoStationsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TblMastMeteoStationsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TblMastMeteoStations(123);
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
        const entity = new TblMastMeteoStations();
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
