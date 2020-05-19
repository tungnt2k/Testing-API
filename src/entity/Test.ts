import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { TestQuestion } from './TestQuestion';
import { Level } from './Level';
import { Category } from './Category';

@Entity()
export class Test {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    staffId: string;

    @Column({
        length: 50
    })
    staffName: string;

    @Column()
    totalQuestions: number;

    @Column({
        default: 0
    })
    passQuestions: number;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    timeStart: Date;

    @Column({
        nullable: true
    })
    timeEnd: Date;

    @Column()
    timeLimit: number;

    @Column({ default: false })
    isSubmit: boolean

    @ManyToOne(type => Level, level => level.tests)
    levelId: number;

    @ManyToOne(type => Category, category => category.tests)
    categoryId: number;

    @OneToMany(type => TestQuestion, testQuestion => testQuestion.testId)
    testQuestions: TestQuestion[];

}