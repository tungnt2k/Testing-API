import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './Question';
import { Test } from './Test';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Question, question => question.categoryId)
    questions: Question[];

    @OneToMany(type => Test, test => test.categoryId)
    tests: Test[];
}