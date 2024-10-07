import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import axios from 'axios';
import * as process from "node:process";

@Injectable()
export class AuthService {
  async create(createAuthDto: CreateAuthDto) {
    const { code } = createAuthDto;
    const tokenUrl =
      'https://vewen82111chaindscom.amocrm.ru/oauth2/access_token';

    try {
      const response = await axios.post(tokenUrl, {
        client_id: process.env.INTEGRATION_ID,
        client_secret: process.env.SECRET_KEY,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
        code: code,
      });

      const data = response.data;
      if (data.access_token) {
        return data;
      } else {
        throw new Error('Failed to exchange code for tokens');
      }
    } catch (error) {
      console.error(
        'Error during token exchange:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
