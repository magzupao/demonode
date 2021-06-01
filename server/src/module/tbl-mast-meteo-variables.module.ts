import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TblMastMeteoVariablesController } from '../web/rest/tbl-mast-meteo-variables.controller';
import { TblMastMeteoVariablesRepository } from '../repository/tbl-mast-meteo-variables.repository';
import { TblMastMeteoVariablesService } from '../service/tbl-mast-meteo-variables.service';

@Module({
  imports: [TypeOrmModule.forFeature([TblMastMeteoVariablesRepository])],
  controllers: [TblMastMeteoVariablesController],
  providers: [TblMastMeteoVariablesService],
  exports: [TblMastMeteoVariablesService]
})
export class TblMastMeteoVariablesModule {}
