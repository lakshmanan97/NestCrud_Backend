import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class StudentModule {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public first_name: string;

    @Column()
    public last_name: string;

    @Column()
    public gender: string;

    @Column()
    public Age: string;

    @Column()
    public mobile_Number: string;

    @Column()
    public address: string;

}

export default StudentModule;