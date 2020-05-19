import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './Question';
import { Test } from './Test';

@Entity()
export class Level {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @OneToMany(type => Question, question => question.levelId)
    questions: Question[];

    @OneToMany(type => Test, test => test.levelId)
    tests: Test[];
}