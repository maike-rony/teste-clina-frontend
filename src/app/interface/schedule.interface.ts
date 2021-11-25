enum StatusSchedule {
    DISPONIVEL = 'Disponível',
    INDISPONIVEL ='Indisponível',
    RESERVADO = 'Reservado'
}

export interface ISchdeule {
    ['string']:
        {
            scheduleId: number;
            roomId: number;
            status: StatusSchedule;
            date: string;
            time_start: string;
            time_end: string;
            period: Array<string>,
            created_at: string;
            updated_at: string;
        }
}