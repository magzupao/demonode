import { EntityRepository, Repository } from 'typeorm';
import DataSerie from '../domain/data-serie.entity';

@EntityRepository(DataSerie)
export class DataSerieRepository extends Repository<DataSerie> {}
