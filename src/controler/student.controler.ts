import CreateDto from 'src/DTO/create.dto';
import UpdateDto from 'src/DTO/update.dto';
import { Body, Delete,Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { studentService } from "../services/student.services"

@Controller('studentmanagement')
export class studentController {
    constructor(private readonly appService: studentService) { }
    @Get()
    getAllStudents() {
        return this.appService.getAllStudents();
    }

    // get student by id
    @Get(':id')
    getStudentById(@Param('id') id: any) {
        console
        return this.appService.getStudentById(id);
    }

    // create student
    @Post()
    async createStudent(@Body() data: CreateDto) {
        return this.appService.createStudent(data);
    }

    // update student
    @Put(':id')
    async updateStudentById(@Param('id') id: string, @Body() data: UpdateDto ) {
        console.log(id,"id")
        console.log(data)
        return this.appService.updateStudentById(parseInt(id), data );
    }

    //delete student
    @Delete(':id')
    async deleteStudent(@Param('id') id: string,) {
        this.appService.deleteStudent(parseInt(id));
    }

}