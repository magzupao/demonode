import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TblMastMeteoVariables from '../src/domain/tbl-mast-meteo-variables.entity';
import { TblMastMeteoVariablesService } from '../src/service/tbl-mast-meteo-variables.service';

describe('TblMastMeteoVariables Controller', () => {
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
      .overrideProvider(TblMastMeteoVariablesService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tbl-mast-meteo-variables ', async () => {
    const getEntities: TblMastMeteoVariables[] = (
      await request(app.getHttpServer())
        .get('/api/tbl-mast-meteo-variables')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tbl-mast-meteo-variables by id', async () => {
    const getEntity: TblMastMeteoVariables = (
      await request(app.getHttpServer())
        .get('/api/tbl-mast-meteo-variables/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tbl-mast-meteo-variables', async () => {
    const createdEntity: TblMastMeteoVariables = (
      await request(app.getHttpServer())
        .post('/api/tbl-mast-meteo-variables')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tbl-mast-meteo-variables', async () => {
    const updatedEntity: TblMastMeteoVariables = (
      await request(app.getHttpServer())
        .put('/api/tbl-mast-meteo-variables')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tbl-mast-meteo-variables', async () => {
    const deletedEntity: TblMastMeteoVariables = (
      await request(app.getHttpServer())
        .delete('/api/tbl-mast-meteo-variables/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
