import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TblMastMeteoVariables from '../../domain/tbl-mast-meteo-variables.entity';
import { TblMastMeteoVariablesService } from '../../service/tbl-mast-meteo-variables.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tbl-mast-meteo-variables')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tbl-mast-meteo-variables')
export class TblMastMeteoVariablesController {
  logger = new Logger('TblMastMeteoVariablesController');

  constructor(private readonly tblMastMeteoVariablesService: TblMastMeteoVariablesService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TblMastMeteoVariables
  })
  async getAll(@Req() req: Request): Promise<TblMastMeteoVariables[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.tblMastMeteoVariablesService.findAndCount({
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
    type: TblMastMeteoVariables
  })
  async getOne(@Param('id') id: string): Promise<TblMastMeteoVariables> {
    return await this.tblMastMeteoVariablesService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tblMastMeteoVariables' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TblMastMeteoVariables
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tblMastMeteoVariables: TblMastMeteoVariables): Promise<TblMastMeteoVariables> {
    const created = await this.tblMastMeteoVariablesService.save(tblMastMeteoVariables);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TblMastMeteoVariables', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tblMastMeteoVariables' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TblMastMeteoVariables
  })
  async put(@Req() req: Request, @Body() tblMastMeteoVariables: TblMastMeteoVariables): Promise<TblMastMeteoVariables> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TblMastMeteoVariables', tblMastMeteoVariables.id);
    return await this.tblMastMeteoVariablesService.update(tblMastMeteoVariables);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tblMastMeteoVariables' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TblMastMeteoVariables> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TblMastMeteoVariables', id);
    const toDelete = await this.tblMastMeteoVariablesService.findById(id);
    return await this.tblMastMeteoVariablesService.delete(toDelete);
  }
}
