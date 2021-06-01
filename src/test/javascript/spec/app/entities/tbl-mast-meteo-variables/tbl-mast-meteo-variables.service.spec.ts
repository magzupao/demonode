import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TblMastMeteoVariablesService } from 'app/entities/tbl-mast-meteo-variables/tbl-mast-meteo-variables.service';
import { ITblMastMeteoVariables, TblMastMeteoVariables } from 'app/shared/model/tbl-mast-meteo-variables.model';

describe('Service Tests', () => {
  describe('TblMastMeteoVariables Service', () => {
    let injector: TestBed;
    let service: TblMastMeteoVariablesService;
    let httpMock: HttpTestingController;
    let elemDefault: ITblMastMeteoVariables;
    let expectedResult: ITblMastMeteoVariables | ITblMastMeteoVariables[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TblMastMeteoVariablesService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TblMastMeteoVariables(0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TblMastMeteoVariables', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TblMastMeteoVariables()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TblMastMeteoVariables', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            unit: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TblMastMeteoVariables', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            unit: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TblMastMeteoVariables', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
