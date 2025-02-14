// src/common/pipes/non-empty-body.pipe.ts
import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { ResponseMessages } from 'src/common/response/response-messages';
import { isEmptyObject } from 'src/common/utils/utils';

@Injectable()
export class NonEmptyBodyPipe implements PipeTransform {
  constructor(
    private readonly allowedKeys: string[],
    private readonly requiredKeys?: string[],
  ) {}
  transform(value: any) {
    this.hasAnyBody(value);
    this.hasMissingKeys(value);
    this.hasInvalidBody(value);
    return value;
  }

  hasAnyBody(value: any) {
    if (!value || isEmptyObject(value)) throw new BadRequestException(ResponseMessages.FAIL.NO_BODY);
  }

  hasMissingKeys(value: any): void {
    const reqKeys = this.requiredKeys && this.requiredKeys.length ? this.requiredKeys : this.allowedKeys;
    const missingKeys = reqKeys.filter((key) => !(key in value));
    if (missingKeys.length > 0) {
      throw new BadRequestException(`요청 바디에 필수 키가 누락되었습니다: ${missingKeys.join(', ')}`);
    }
  }

  hasInvalidBody(value: any) {
    const invalidKeys = Object.keys(value).filter((key) => !this.allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
      throw new BadRequestException(`${ResponseMessages.FAIL.BAD_BODY}: ${invalidKeys.join(', ')}. 허용된 키: ${this.allowedKeys.join(', ')}`);
    }
  }
}
