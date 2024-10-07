import { HttpException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import axios from 'axios';
import { IContact, IPaginatedResponse } from '../types';
import {ConvertCustomFields, IDataForConvertCustomFields} from "../utils/ConvertCustomFields";

@Injectable()
export class ContactService {
  private readonly url =
    'https://vewen82111chaindscom.amocrm.ru/api/v4/contacts';

  async create(accessToken: string, createContactDto: CreateContactDto[]) {
    createContactDto.forEach((contact) => {
      if (contact.custom_fields_values.length > 0) {
        return ConvertCustomFields(contact as IDataForConvertCustomFields);
      }
      return contact;
    });
    try {
      const response = await axios.post<
        IPaginatedResponse<IContact, 'contacts'>
      >(this.url, createContactDto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      response.data._embedded.contacts[0].name = createContactDto[0].name;
      return response.data._embedded.contacts[0];
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
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
