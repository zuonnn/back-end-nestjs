import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TypesService } from '../service/types.service';
import { CreateTypeDto } from '../model/dto/create-type.dto';
import { UpdateTypeDto } from '../model/dto/update-type.dto';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.createType(createTypeDto);
  }

  @Get()
  findAll() {
    return this.typesService.getTypes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesService.getTypeById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.updateType(+id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.deleteType(+id);
  }
}
