import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Evento } from "./evento.entity";
import { Patrocinador } from "./patrocinador.entity";

@Entity({ name: 'Patrocinio' })
export class Patrocinio {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Evento, (evento) => evento.id_evento)
    @JoinColumn({ name: 'id_evento' })
    public id_evento: Evento;

    @ManyToOne(() => Patrocinador, (patrocinador) => patrocinador.id_patocinador)
    @JoinColumn({ name: 'id_patocinador' })
    public id_patocinador: Patrocinador;

    @Column({ length: 50 })
    public rol: string;
}