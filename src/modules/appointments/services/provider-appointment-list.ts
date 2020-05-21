import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import { IAppointmentRepository } from '@modules/appointments/repositories';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ProviderAppointmentList {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    return appointments;
  }
}
