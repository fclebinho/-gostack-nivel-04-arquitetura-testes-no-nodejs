import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/users-repository';

import { IAppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import { AppointmentRepository } from '@modules/appointments/infra/typeorm/repositories/appointment-repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
