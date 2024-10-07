import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldValue, Tag } from '../../company/types';

export class CreateContactDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  responsible_user_id: number;

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
