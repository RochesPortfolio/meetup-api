import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Persona } from "./persona.entity";
import { Empresa } from "./empresa.entity";
import { Evento } from "./evento.entity";
import { MailTemplateType } from "../mail-templates/interfaces/mail-template.type";

export type EstadoInvitacion = 'Pendiente' | 'Confirmada' | 'Declinada' | 'Cancelada';
@Entity({ name: 'Invitacion' })
export class Invitacion {
    @PrimaryGeneratedColumn()
    public id_invitacion: number;

    @Column({ type: "uuid", unique: true, nullable: false })
    public hash_invite: string;

    @ManyToOne(() => Persona, (persona) => persona.id_persona)
    @JoinColumn({ name: 'id_persona' })
    public id_persona: Persona;

    @ManyToOne(() => Empresa, (empresa) => empresa.id_empresa)
    @JoinColumn({ name: 'id_empresa' })
    public id_empresa: Empresa;

    @ManyToOne(() => Evento, (evento) => evento.id_evento)
    @JoinColumn({ name: 'id_evento' })
    public id_evento: Evento;

    @Column({ type: "text", nullable: false })
    public estado_invitacion: EstadoInvitacion;
    
    @Column({ type: "text", nullable: false })
    public tipo_invitacion: MailTemplateType;

    @Column({ type: 'date', nullable: true })
    public fecha_invitacion: string;

    @Column({ type: 'date', nullable: true })
    public fecha_confirmacion: string;

    @Column({ type: 'text', nullable: true })
    public notas: string;


}