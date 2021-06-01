import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CodechallengemarcoTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { TblMastMeteoVariablesDeleteDialogComponent } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables-delete-dialog.component';
import { TblMastMeteoVariablesService } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables.service';

describe('Component Tests', () => {
  describe('TblMastMeteoVariables Management Delete Component', () => {
    let comp: TblMastMeteoVariablesDeleteDialogComponent;
    let fixture: ComponentFixture<TblMastMeteoVariablesDeleteDialogComponent>;
    let service: TblMastMeteoVariablesService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CodechallengemarcoTestModule],
        declarations: [TblMastMeteoVariablesDeleteDialogComponent]
      })
        .overrideTemplate(TblMastMeteoVariablesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TblMastMeteoVariablesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TblMastMeteoVariablesService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
