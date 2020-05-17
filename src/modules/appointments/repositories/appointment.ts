import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/create-appointment';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
