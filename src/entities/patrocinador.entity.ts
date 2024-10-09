import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Segmento } from "./segmento.entity";

@Entity({ name: 'Patrocinador' })
export class Patrocinador {
    @PrimaryGeneratedColumn()
    public id_patocinador: number;

    @Column({ length: 100 })
    public nombre: string;

    @Column({ length: 100 })
    public correo_electronico: string;

    @Column({ length: 20, nullable: true })
    public telefono: string;

    @Column({ length: 50, nullable: true })
    public pais_origen: string;

    @ManyToOne(() => Segmento)
    public id_segmento: Segmento;

    @Column({ type: 'int', nullable: true })
    public asistentes: number;

    @Column({ type: 'int', nullable: true })
    public staff: number;

    @CreateDateColumn()
    public fecha_creacion: Date;

    @UpdateDateColumn()
    public fecha_actualizacion: Date;
}