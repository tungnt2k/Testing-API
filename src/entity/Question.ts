import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Level } from './Level';
import { Category } from './Category';
import { TestQuestion } from './TestQuestion';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    body: string;

    @Column("text")
    result: string;

    @ManyToOne(type => Level, level => level.questions)
    levelId: number;

    @ManyToOne(type => Category, category => category.questions)
    categoryId: number;

    @OneToMany(type => TestQuestion, testQuestion => testQuestion.questionId)
    testQuestions: TestQuestion[];
}