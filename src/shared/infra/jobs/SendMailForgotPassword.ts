import { container } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISenMailForgotPasswordDTO from './dtos/ISenMailForgotPasswordDTO';

export default async function SendMailForgotPassword({
  to,
  from,
  data,
}: ISenMailForgotPasswordDTO) {
  const mailProvider = container.resolve<IMailProvider>('MailProvider');
  const template = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'views',
    'ForgotPassword.hbs',
  );
  await mailProvider.sendMail({
    subject: 'Recuperação de Senha',
    templateData: {
      file: template,
      variables: data,
    },
    to,
    from,
  });
}
