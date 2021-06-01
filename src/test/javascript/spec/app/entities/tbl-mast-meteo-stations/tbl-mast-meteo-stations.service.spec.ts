import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TblMastMeteoStationsService } from 'app/entities/tbl-mast-meteo-stations/tbl-mast-meteo-stations.service';
import { ITblMastMeteoStations, TblMastMeteoStations } from 'app/shared/model/tbl-mast-meteo-stations.model';

describe('Service Tests', () => {
  describe('TblMastMeteoStations Service', () => {
    let injector: TestBed;
    let service: TblMastMeteoStationsService;
    let httpMock: HttpTestingController;
    let elemDefault: ITblMastMeteoStations;
    let expectedResult: ITblMastMeteoStations | ITblMastMeteoStations[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TblMastMeteoStationsService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TblMastMeteoStations(0, 'AAAAAAA', 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TblMastMeteoStations', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TblMastMeteoStations()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TblMastMeteoStations', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            longitude: 1,
            latitude: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TblMastMeteoStations', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            longitude: 1,
            latitude: 1
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

      it('should delete a TblMastMeteoStations', () => {
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
