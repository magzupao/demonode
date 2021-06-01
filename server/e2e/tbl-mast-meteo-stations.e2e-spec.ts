import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TblMastMeteoStations from '../src/domain/tbl-mast-meteo-stations.entity';
import { TblMastMeteoStationsService } from '../src/service/tbl-mast-meteo-stations.service';

describe('TblMastMeteoStations Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(TblMastMeteoStationsService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tbl-mast-meteo-stations ', async () => {
    const getEntities: TblMastMeteoStations[] = (
      await request(app.getHttpServer())
        .get('/api/tbl-mast-meteo-stations')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tbl-mast-meteo-stations by id', async () => {
    const getEntity: TblMastMeteoStations = (
      await request(app.getHttpServer())
        .get('/api/tbl-mast-meteo-stations/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tbl-mast-meteo-stations', async () => {
    const createdEntity: TblMastMeteoStations = (
      await request(app.getHttpServer())
        .post('/api/tbl-mast-meteo-stations')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tbl-mast-meteo-stations', async () => {
    const updatedEntity: TblMastMeteoStations = (
      await request(app.getHttpServer())
        .put('/api/tbl-mast-meteo-stations')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tbl-mast-meteo-stations', async () => {
    const deletedEntity: TblMastMeteoStations = (
      await request(app.getHttpServer())
        .delete('/api/tbl-mast-meteo-stations/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
