import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Empresa } from "./empresa.entity";

@Entity({ name: 'Persona' })
export class Persona {
    @PrimaryGeneratedColumn()
    id_persona: number;

    @Column({ length: 100 })
    nombres: string;

    @Column({ length: 100 })
    apellidos: string;

    @Column({ length: 100 })
    correo: string;

    @Column({ length: 20, nullable: true })
    telefono: string;

    @Column({ length: 100, nullable: true })
    cargo: string;

    @Column({ type: 'char', length: 1, nullable: true })
    genero: string;

    @ManyToOne(() => Empresa)
    id_empresa: Empresa;

    @Column({ length: 100, nullable: true })
    residencia: string;

    @Column({ length: 50, nullable: true })
    rubro_negocio: string;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;
}