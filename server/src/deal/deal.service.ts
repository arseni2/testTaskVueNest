import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import {
  ConvertCustomFields,
  IDataForConvertCustomFields,
} from '../utils/ConvertCustomFields';
import axios from 'axios';
import { IDeal, IPaginatedResponse } from '../types';

@Injectable()
export class DealService {
  private readonly url = 'https://vewen82111chaindscom.amocrm.ru/api/v4/leads';

  async create(accessToken: string, createDealDto: CreateDealDto[]) {
    createDealDto.forEach((deal) => {
      if (deal.custom_fields_values && deal.custom_fields_values.length > 0) {
        return ConvertCustomFields(deal as IDataForConvertCustomFields);
      }
      return deal;
    });
    try {
      const response = await axios.post<IPaginatedResponse<IDeal, 'leads'>>(
        this.url,
        createDealDto,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      response.data._embedded.leads[0].name = createDealDto[0].name;
      return response.data._embedded.leads[0];
    } catch (error) {
      const errorDetails =
        error.response?.data?.['validation-errors'][0].errors;
      throw new HttpException(
        {
          message: 'Произошла ошибка при создании контакта',
          validationErrors: errorDetails,
        },
        error.response.status,
      );
    }
  }

  findAll() {
    return `This action returns all deal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deal`;
  }

  update(id: number, updateDealDto: UpdateDealDto) {
    return `This action updates a #${id} deal`;
  }

  remove(id: number) {
    return `This action removes a #${id} deal`;
  }
}
