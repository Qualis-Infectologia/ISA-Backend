import { container } from "tsyringe";
import ISendSmsUserNotApprovedDTO from "./dtos/ISendSmsUserNotApprovedDTO";
import ISmsProvider from "@shared/container/providers/SmsProvider/models/ISmsProvider";

export default async function SendMailUserNotApproved({
  name,
  attended,
  establishment,
  phone,
}: ISendSmsUserNotApprovedDTO) {
  const smsProvider = container.resolve<ISmsProvider>("SmsProvider");

  await smsProvider.sendSms({
    msg: `Olá ${name}, o usuário ${attended} do estabelecimento ${establishment}, apresentou alguns sintomas.`,
    to: {
      phone,
    },
  });
}
