import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Persona } from "./persona.entity";
import { Empresa } from "./empresa.entity";
import { Evento } from "./evento.entity";

export type EstadoInvitacion = 'Pendiente' | 'Confirmada' | 'Declinada';
@Entity({ name: 'Invitacion' })
export class Invitacion {
    @PrimaryGeneratedColumn()
    public id_invitacion: number;

    @Column({ type: "uuid", unique: true, nullable: false })
    public hash_invite: string;

    @ManyToOne(() => Persona)
    public id_persona: Persona;

    @ManyToOne(() => Empresa)
    public id_empresa: Empresa;

    @ManyToOne(() => Evento)
    public id_evento: Evento;

    @Column({ type: "text", nullable: false })
    public estado_invitacion: EstadoInvitacion;

    @Column({ type: 'date', nullable: true })
    public fecha_invitacion: string;

    @Column({ type: 'date', nullable: true })
    public fecha_confirmacion: string;

    @Column({ type: 'text', nullable: true })
    public notas: string;


}