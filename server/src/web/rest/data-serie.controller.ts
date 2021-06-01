import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import DataSerie from '../../domain/data-serie.entity';
import { DataSerieService } from '../../service/data-serie.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import * as Rx from 'rxjs/Rx';
import http from 'axios';

@Controller('api/data-series')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('data-series')
export class DataSerieController {
  logger = new Logger('DataSerieController');

  constructor(private readonly dataSerieService: DataSerieService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DataSerie
  })
  async getAll(@Req() req: Request): Promise<DataSerie[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.dataSerieService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: DataSerie
  })
  async getOne(@Param('id') id: string): Promise<DataSerie> {
    return await this.dataSerieService.findById(id);
  }

  @Get('/findAll/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: DataSerie
  })
  async getAllId(@Param('id') id: string, @Req() req: Request): Promise<DataSerie[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.dataSerieService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    console.log(" ************* **************** *************** ", id);

    const data = await this.fetchTeam("https://demo3679421.mockable.io/meteo"); 

    var j = 1;
    for(var i in data) {

      const idNumber = Number(id)

      if(idNumber === data[i]["cod_station"]){
        const dataSerie = new DataSerie();
        dataSerie.codStation = data[i]["cod_station"];
        dataSerie.ts= data[i]["ts"];
        dataSerie.temp= data[i]["temp"];
        dataSerie.wind= data[i]["wind"];
        dataSerie.prec= data[i]["prec"];
        dataSerie.pres= data[i]["pres"];
        dataSerie.hum= data[i]["hum"];      
        results.push(dataSerie);
        j = j + 1;
      }
    }

    const counts = j;    

    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }    

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create dataSerie' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DataSerie
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() dataSerie: DataSerie): Promise<DataSerie> {
    const created = await this.dataSerieService.save(dataSerie);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DataSerie', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update dataSerie' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DataSerie
  })
  async put(@Req() req: Request, @Body() dataSerie: DataSerie): Promise<DataSerie> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DataSerie', dataSerie.id);
    return await this.dataSerieService.update(dataSerie);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete dataSerie' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<DataSerie> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'DataSerie', id);
    const toDelete = await this.dataSerieService.findById(id);
    return await this.dataSerieService.delete(toDelete);
  }

  fetchTeam(name: any): Promise<any> {
    return http.get(name)
        .then(resp => resp.data )
        .catch(error => {
            throw  new Error("todo: fill error message");
        })
  }  
}
