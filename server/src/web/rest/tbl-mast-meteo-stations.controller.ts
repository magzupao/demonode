import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TblMastMeteoStations from '../../domain/tbl-mast-meteo-stations.entity';
import { TblMastMeteoStationsService } from '../../service/tbl-mast-meteo-stations.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tbl-mast-meteo-stations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tbl-mast-meteo-stations')
export class TblMastMeteoStationsController {
  logger = new Logger('TblMastMeteoStationsController');

  constructor(private readonly tblMastMeteoStationsService: TblMastMeteoStationsService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TblMastMeteoStations
  })
  async getAll(@Req() req: Request): Promise<TblMastMeteoStations[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.tblMastMeteoStationsService.findAndCount({
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
    type: TblMastMeteoStations
  })
  async getOne(@Param('id') id: string): Promise<TblMastMeteoStations> {
    return await this.tblMastMeteoStationsService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tblMastMeteoStations' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TblMastMeteoStations
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tblMastMeteoStations: TblMastMeteoStations): Promise<TblMastMeteoStations> {
    const created = await this.tblMastMeteoStationsService.save(tblMastMeteoStations);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TblMastMeteoStations', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tblMastMeteoStations' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TblMastMeteoStations
  })
  async put(@Req() req: Request, @Body() tblMastMeteoStations: TblMastMeteoStations): Promise<TblMastMeteoStations> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TblMastMeteoStations', tblMastMeteoStations.id);
    return await this.tblMastMeteoStationsService.update(tblMastMeteoStations);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tblMastMeteoStations' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TblMastMeteoStations> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TblMastMeteoStations', id);
    const toDelete = await this.tblMastMeteoStationsService.findById(id);
    return await this.tblMastMeteoStationsService.delete(toDelete);
  }
}
