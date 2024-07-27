import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "../common/base.entity"

@Entity({name: 'user'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    public firstName: string

    @Column()
    public lastName: string
}