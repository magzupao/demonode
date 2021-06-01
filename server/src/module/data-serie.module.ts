import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSerieController } from '../web/rest/data-serie.controller';
import { DataSerieRepository } from '../repository/data-serie.repository';
import { DataSerieService } from '../service/data-serie.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataSerieRepository])],
  controllers: [DataSerieController],
  providers: [DataSerieService],
  exports: [DataSerieService]
})
export class DataSerieModule {}
