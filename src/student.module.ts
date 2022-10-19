import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StudentModule from './StudentEntity/student.entity';
import { studentService } from './services/student.services';
import { studentController } from './controler/student.controler';

@Module({
    imports: [TypeOrmModule.forFeature([StudentModule])],
    controllers: [studentController],
    providers: [studentService],
})
export class stuModule { }