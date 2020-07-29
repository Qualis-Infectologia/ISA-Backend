import { container } from 'tsyringe';
import ISendSmsUserNotLiberateDTO from './dtos/ISendSmsUserNotLiberateDTO';
import ISmsProvider from '@shared/container/providers/SmsProvider/models/ISmsProvider';

export default async function SendSmsUserNotLiberateResponsible({
  name,
  attended,
  phone,
  days,
}: ISendSmsUserNotLiberateDTO) {
  const smsProvider = container.resolve<ISmsProvider>('SmsProvider');

  await smsProvider.sendSms({
    msg: `Olá ${name}, o acesso do usuário ${attended} teve o acesso negado por ${days}.`,
    to: {
      phone,
    },
  });
}
