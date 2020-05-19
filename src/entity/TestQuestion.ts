import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { Question } from './Question';
import { Test } from './Test';

@Entity()
export class TestQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Question, question => question.testQuestions)
    questionId: number;

    @ManyToOne(type => Test, test => test.testQuestions)
    testId: number;

    @Column({
        nullable: true,
        length: 255
    })
    answer: string
}