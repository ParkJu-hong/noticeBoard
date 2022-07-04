import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Text {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: "text"})
    text: string;

}