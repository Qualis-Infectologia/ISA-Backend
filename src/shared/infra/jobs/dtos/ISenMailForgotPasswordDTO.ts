import User from '@users/infra/typeorm/entities/User';

interface IContactMail {
  name: string;
  address: string;
}

export default interface ISenMailForgotPasswordDTO {
  to: IContactMail;
  from: IContactMail;
  data: {
    name: string;
    url: string;
    username: string;
  };
}
