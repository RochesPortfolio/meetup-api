import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Persona } from "./persona.entity";
import { Empresa } from "./empresa.entity";
import { Evento } from "./evento.entity";

@Entity({ name: 'Invitacion' })
export class Invitacion {
    @PrimaryGeneratedColumn()
    public id_invitacion: number;

    @ManyToOne(() => Persona)
    public id_persona: Persona;

    @ManyToOne(() => Empresa)
    public id_empresa: Empresa;

    @ManyToOne(() => Evento)
    public id_evento: Evento;

    @Column({ length: 50 })
    public estado_invitacion: string;

    @Column({ type: 'date', nullable: true })
    public fecha_invitacion: string;

    @Column({ type: 'date', nullable: true })
    public fecha_confirmacion: string;

    @Column({ type: 'text', nullable: true })
    public notas: string;
}