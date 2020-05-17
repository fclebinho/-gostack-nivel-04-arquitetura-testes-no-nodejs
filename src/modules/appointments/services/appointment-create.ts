import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { IAppointmentRepository } from '@modules/appointments/repositories';
import { ApplicationError } from '@shared/errors/application-error';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';

export interface IAppointmentRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class AppointmentCreate {
  constructor(
    @inject('AppointmentRepository')
    private repository: IAppointmentRepository,
  ) {}

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

export default AppointmentCreate;
