import { container } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import SendMailUserNotLiberateResponsibleDTO from './dtos/SendMailUserNotLiberateResponsibleDTO';

export default async function SendMailUserNotLiberateResponsible({
  to,
  from,
  data,
}: SendMailUserNotLiberateResponsibleDTO) {
  const mailProvider = container.resolve<IMailProvider>('MailProvider');
  const template = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'views',
    'UserNotLiberateResponsible.hbs',
  );
  await mailProvider.sendMail({
    subject: 'AVISO - Usuário com Acesso Negado!',
    templateData: {
      file: template,
      variables: data,
    },
    to,
    from,
  });
}
