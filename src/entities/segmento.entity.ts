import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Segmento' })
export class Segmento {
    @PrimaryGeneratedColumn()
    id_segmento: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ type: 'int', nullable: true })
    valoracion: number;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()s
    fecha_actualizacion: Date;
}