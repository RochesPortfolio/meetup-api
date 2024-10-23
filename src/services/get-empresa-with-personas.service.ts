import loggerService from './logger.service';
import { myDataSource } from '../database/app-data-source';
import { Empresa } from '../entities/empresa.entity';
import { Persona } from '../entities/persona.entity';
import { HttpStatus } from '../enums/http-code.enum';


export interface getEmpresaWithPersonasProps {
    from: string;
}

interface GetEmpresaWithPersonasResponseDTO {
    Empresa: {
        id_empresa: number,
        nombre: string,
        telefono: string,
        correo: string,
        rubro_negocio: string,
        Personas: Persona[];

    };
    message?: string;
    status?: HttpStatus;
}

export const getEmpresaWithPersonas = async (): Promise<GetEmpresaWithPersonasResponseDTO[]> => {
    loggerService.info(`Obteniendo personas por empresa`);
    const empresaRepository = myDataSource.getRepository(Empresa);

    try {
        const empresas = await empresaRepository.find({ relations: ['personas'] });
        // const empresa = await empresaRepository.findOne(id_empresa, { relations: ['personas'] });


        if (!empresas.length || !empresas) {
            return undefined;
        }

        // if (!empresas) {
        //     return { status: 404, message: 'Empresa no encontrada' };
        // }

        const result = empresas.map(empresa => ({
            Empresa: {
                id_empresa: empresa.id_empresa,
                nombre: empresa.nombre,
                telefono: empresa.telefono,
                correo: empresa.correo,
                rubro_negocio: empresa.rubro_negocio,
                Personas: empresa.personas
            },

        }));

        return result;
    } catch (error) {
        loggerService.error(`Error obteniendo personas por empresa:`, error);
        throw new Error(`Error obteniendo personas por empresa: ${error}`);
    }
}
