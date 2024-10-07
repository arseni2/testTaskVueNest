import { HttpException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import axios from 'axios';
import { ICompany, IPaginatedResponse } from '../types';
import {ConvertCustomFields, IDataForConvertCustomFields} from "../utils/ConvertCustomFields";

@Injectable()
export class CompanyService {
  private readonly url =
    'https://vewen82111chaindscom.amocrm.ru/api/v4/companies';

  async create(accessToken: string, createCompanyDto: CreateCompanyDto[]) {
    createCompanyDto.forEach((company) => {
      if (company.custom_fields_values.length > 0) {
        return ConvertCustomFields(company as IDataForConvertCustomFields);
      }
      return company;
    });
    try {
      const response = await axios.post<
        IPaginatedResponse<ICompany, 'companies'>
      >(this.url, createCompanyDto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      response.data._embedded.companies[0].name = createCompanyDto[0].name;
      return response.data._embedded.companies[0];
    } catch (error) {
      const errorDetails =
        error.response?.data?.['validation-errors'][0].errors;
      throw new HttpException(
        {
          message: 'Произошла ошибка при создании компании',
          validationErrors: errorDetails,
        },
        error.response.status,
      );
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
