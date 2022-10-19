import CreateDto from './DTO/create.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UpdateDto from './DTO/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import StudentModule from './StudentEntity/student.entity';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }


}
