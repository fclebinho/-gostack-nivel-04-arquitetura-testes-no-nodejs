import { startOfHour } from 'date-fns';

import { IAppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import { ApplicationError } from '@shared/errors/application-error';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';

export interface IAppointmentRequest {
  provider_id: string;
  date: Date;
}

export class AppointmentCreateService {
  constructor(private repository: IAppointmentRepository) {}

  public async execute({
    provider_id,
    date,
  }: IAppointmentRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = await this.repository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      throw new ApplicationError('This appointment is already booked');
    }

    const appointment = await this.repository.create({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}

export default AppointmentCreateService;
