import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/providers';

import { IUsersRepository } from '@modules/users/repositories';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories';

import { IAppointmentRepository } from '@modules/appointments/repositories';
import { AppointmentRepository } from '@modules/appointments/infra/typeorm/repositories/appointment-repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
