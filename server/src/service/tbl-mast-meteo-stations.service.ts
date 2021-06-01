import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import TblMastMeteoStations from '../domain/tbl-mast-meteo-stations.entity';
import { TblMastMeteoStationsRepository } from '../repository/tbl-mast-meteo-stations.repository';

const relationshipNames = [];

@Injectable()
export class TblMastMeteoStationsService {
  logger = new Logger('TblMastMeteoStationsService');

  constructor(@InjectRepository(TblMastMeteoStationsRepository) private tblMastMeteoStationsRepository: TblMastMeteoStationsRepository) {}

  async findById(id: string): Promise<TblMastMeteoStations | undefined> {
    const options = { relations: relationshipNames };
    return await this.tblMastMeteoStationsRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TblMastMeteoStations>): Promise<TblMastMeteoStations | undefined> {
    return await this.tblMastMeteoStationsRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<TblMastMeteoStations>): Promise<[TblMastMeteoStations[], number]> {
    options.relations = relationshipNames;
    return await this.tblMastMeteoStationsRepository.findAndCount(options);
  }

  async save(tblMastMeteoStations: TblMastMeteoStations): Promise<TblMastMeteoStations | undefined> {
    return await this.tblMastMeteoStationsRepository.save(tblMastMeteoStations);
  }

  async update(tblMastMeteoStations: TblMastMeteoStations): Promise<TblMastMeteoStations | undefined> {
    return await this.save(tblMastMeteoStations);
  }

  async delete(tblMastMeteoStations: TblMastMeteoStations): Promise<TblMastMeteoStations | undefined> {
    return await this.tblMastMeteoStationsRepository.remove(tblMastMeteoStations);
  }
}
