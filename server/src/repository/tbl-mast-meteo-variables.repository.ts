import { EntityRepository, Repository } from 'typeorm';
import TblMastMeteoVariables from '../domain/tbl-mast-meteo-variables.entity';

@EntityRepository(TblMastMeteoVariables)
export class TblMastMeteoVariablesRepository extends Repository<TblMastMeteoVariables> {}
