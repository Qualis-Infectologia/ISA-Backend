import { container } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailUserNotApprovedDTO from './dtos/ISendMailUserNotApprovedDTO';

export default async function SendMailUserNotApproved({
  to,
  from,
  data,
}: ISendMailUserNotApprovedDTO) {
  const mailProvider = container.resolve<IMailProvider>('MailProvider');
  const template = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'views',
    'UserNotApproved.hbs',
  );
  await mailProvider.sendMail({
    subject: 'AVISO - Sintomas!',
    templateData: {
      file: template,
      variables: data,
    },
    to,
    from,
  });
}
