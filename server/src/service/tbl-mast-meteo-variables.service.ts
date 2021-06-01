import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import TblMastMeteoVariables from '../domain/tbl-mast-meteo-variables.entity';
import { TblMastMeteoVariablesRepository } from '../repository/tbl-mast-meteo-variables.repository';

const relationshipNames = [];

@Injectable()
export class TblMastMeteoVariablesService {
  logger = new Logger('TblMastMeteoVariablesService');

  constructor(
    @InjectRepository(TblMastMeteoVariablesRepository) private tblMastMeteoVariablesRepository: TblMastMeteoVariablesRepository
  ) {}

  async findById(id: string): Promise<TblMastMeteoVariables | undefined> {
    const options = { relations: relationshipNames };
    return await this.tblMastMeteoVariablesRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TblMastMeteoVariables>): Promise<TblMastMeteoVariables | undefined> {
    return await this.tblMastMeteoVariablesRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<TblMastMeteoVariables>): Promise<[TblMastMeteoVariables[], number]> {
    options.relations = relationshipNames;
    return await this.tblMastMeteoVariablesRepository.findAndCount(options);
  }

  async save(tblMastMeteoVariables: TblMastMeteoVariables): Promise<TblMastMeteoVariables | undefined> {
    return await this.tblMastMeteoVariablesRepository.save(tblMastMeteoVariables);
  }

  async update(tblMastMeteoVariables: TblMastMeteoVariables): Promise<TblMastMeteoVariables | undefined> {
    return await this.save(tblMastMeteoVariables);
  }

  async delete(tblMastMeteoVariables: TblMastMeteoVariables): Promise<TblMastMeteoVariables | undefined> {
    return await this.tblMastMeteoVariablesRepository.remove(tblMastMeteoVariables);
  }
}
