import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TblMastMeteoStationsController } from '../web/rest/tbl-mast-meteo-stations.controller';
import { TblMastMeteoStationsRepository } from '../repository/tbl-mast-meteo-stations.repository';
import { TblMastMeteoStationsService } from '../service/tbl-mast-meteo-stations.service';

@Module({
  imports: [TypeOrmModule.forFeature([TblMastMeteoStationsRepository])],
  controllers: [TblMastMeteoStationsController],
  providers: [TblMastMeteoStationsService],
  exports: [TblMastMeteoStationsService]
})
export class TblMastMeteoStationsModule {}
