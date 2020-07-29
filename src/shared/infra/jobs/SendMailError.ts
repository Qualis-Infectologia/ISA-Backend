import { container } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailErrorDTO from './dtos/ISendMailErrorDTO';

export default async function SendMailError({
  to,
  from,
  data,
}: ISendMailErrorDTO) {
  const mailProvider = container.resolve<IMailProvider>('MailProvider');
  const template = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'views',
    'Error.hbs',
  );
  await mailProvider.sendMail({
    subject: 'AVISO - Ocorreu um Erro!',
    templateData: {
      file: template,
      variables: data,
    },
    to,
    from,
  });
}
