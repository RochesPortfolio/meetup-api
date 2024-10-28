import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum EventoEstado {
    FINALIZADO = 'Finalizado',
    EN_CURSO=   'En curso',
    PLANIFICADOS = 'Pendiente'
}

@Entity({ name: 'Evento' })
export class Evento {
    @PrimaryGeneratedColumn()
    public id_evento: number;

    @Column({ type: 'uuid', nullable: false, unique: true })
    public hash_evento: string;

    @Column({ length: 100 })
    public nombre_evento: string;

    @Column({ length: 150, nullable: true })
    public lugar_evento: string;

    @Column({ type: 'int', nullable: true })
    public aforo_evento: number;

    @Column({ length: 50, nullable: true })
    public tipo_evento: string;

    @Column({ type: 'text', nullable: true })
    public descripcion: string;

    @Column({ type: 'text', nullable: true })
    public rubro_negocio: string;

    @Column({ type: 'text', nullable: true })
    public status: EventoEstado;

    @Column({ type: 'time', nullable: true })
    public hora_inicio: string;

    @Column({ type: 'time', nullable: true })
    public hora_culminacion: string;

    @Column({ type: 'date', nullable: true })
    public fecha_inicio: string;

    @Column({ type: 'date', nullable: true })
    public fecha_finalizacion: string;

    @CreateDateColumn()
    public fecha_creacion: Date;

    @UpdateDateColumn()
    public fecha_actualizacion: Date;
}