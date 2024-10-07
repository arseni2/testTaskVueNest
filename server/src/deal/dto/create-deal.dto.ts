import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldValue, Tag } from '../../company/types';

export class CreateDealDto {
  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  price?: number;

  @ApiProperty({ nullable: true })
  status_id?: number;

  @ApiProperty({ nullable: true })
  pipeline_id?: number;

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
}
