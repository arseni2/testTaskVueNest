import { CustomFieldValue, Tag } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  responsible_user_id?: number;

  @ApiProperty({ nullable: true })
  created_by?: number;

  @ApiProperty({ nullable: true })
  updated_by?: number;

  @ApiProperty({ nullable: true })
  created_at?: number;

  @ApiProperty({ nullable: true })
  updated_at?: number;

  @ApiProperty({ nullable: true })
  custom_fields_values?: CustomFieldValue[];

  @ApiProperty({ nullable: true })
  tags_to_add?: Partial<Tag>[];

  @ApiProperty({ nullable: true })
  request_id?: string;
}
