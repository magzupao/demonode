import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import DataSerie from '../domain/data-serie.entity';
import { DataSerieRepository } from '../repository/data-serie.repository';

const relationshipNames = [];

@Injectable()
export class DataSerieService {
  logger = new Logger('DataSerieService');

  constructor(@InjectRepository(DataSerieRepository) private dataSerieRepository: DataSerieRepository) {}

  async findById(id: string): Promise<DataSerie | undefined> {
    const options = { relations: relationshipNames };
    return await this.dataSerieRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<DataSerie>): Promise<DataSerie | undefined> {
    return await this.dataSerieRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<DataSerie>): Promise<[DataSerie[], number]> {
    options.relations = relationshipNames;
    return await this.dataSerieRepository.findAndCount(options);
  }

  async save(dataSerie: DataSerie): Promise<DataSerie | undefined> {
    return await this.dataSerieRepository.save(dataSerie);
  }

  async update(dataSerie: DataSerie): Promise<DataSerie | undefined> {
    return await this.save(dataSerie);
  }

  async delete(dataSerie: DataSerie): Promise<DataSerie | undefined> {
    return await this.dataSerieRepository.remove(dataSerie);
  }
}
