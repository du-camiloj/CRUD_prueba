import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity} from "typeorm";
import { PurchaseSchema } from "./PurchaseSchema";


@Entity()


export class UserSchema extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string
    
    @Column()
    password: string

    @Column()
    money: number

    @OneToMany(()=> PurchaseSchema, x=> x.user, {cascade: true})
    purchases!: Array<PurchaseSchema>

}