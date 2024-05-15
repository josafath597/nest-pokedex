import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Min(1)
  limit?: number;
  @IsOptional()
  @Min(1)
  page?: number;
  @IsOptional()
  @IsString()
  search?: string;
}
