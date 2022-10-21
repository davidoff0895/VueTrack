import { IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  readonly offset: number;
  @IsPositive()
  readonly limit: number;
}
