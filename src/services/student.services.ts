import CreateDto from 'src/DTO/create.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UpdateDto from 'src/DTO/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import StudentModule from 'src/StudentEntity/student.entity';

@Injectable()
export class studentService {
    constructor(
        @InjectRepository(StudentModule) private studentRepository: Repository<StudentModule>,
    ) { }

    // get all students
    getAllStudents() {
        return this.studentRepository.find();
    }

    // find by id
    async getStudentById(id:any) {
        const data = await this.studentRepository.findOne( { where:
            { id: id }
        });
        if (data) {
            return data;
        }

        throw new HttpException('student not found', HttpStatus.NOT_FOUND);
    }

    // create
    async createStudent(type: CreateDto) {
        const newData = await this.studentRepository.create(type);
        await this.studentRepository.save(newData);

        return newData;
    }

    // update
    async updateStudentById(id:any, post: UpdateDto ) {
        const updatedData = await this.studentRepository.update(id,post);
        if (updatedData.affected) {
            return updatedData
        }

    throw new HttpException('student not found', HttpStatus.NOT_FOUND);

       
    }

    // delete
    async deleteStudent(id: number,res) {
        const deletedData = await this.studentRepository.delete(id);
        if(deletedData.affected){
            return res.status(200).send(`the id ${id} has been deleted`);
        }
        if (!deletedData.affected) {
           return res.status(HttpStatus.NOT_FOUND).send(`student not found in this id ${id}`);
        }
    }
}
