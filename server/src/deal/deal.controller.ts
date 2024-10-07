import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req, UseGuards,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guard/JWT.guard';

@Controller('deal')
@ApiTags('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @UseGuards(JwtGuard)
  @Post('')
  create(@Req() req: Request, @Body() createDealDto: CreateDealDto) {
    const dtoArray = Array.isArray(createDealDto)
      ? createDealDto
      : [createDealDto];
    return this.dealService.create(req['token'], dtoArray);
  }

  @Get()
  findAll() {
    return this.dealService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealService.update(+id, updateDealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealService.remove(+id);
  }
}
