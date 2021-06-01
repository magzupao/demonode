import { EntityRepository, Repository } from 'typeorm';
import TblMastMeteoStations from '../domain/tbl-mast-meteo-stations.entity';

@EntityRepository(TblMastMeteoStations)
export class TblMastMeteoStationsRepository extends Repository<TblMastMeteoStations> {}
