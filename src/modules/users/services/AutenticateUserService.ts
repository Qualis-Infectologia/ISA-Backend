// import { compare } from 'bcryptjs';
// import { sign } from 'jsonwebtoken';
// import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
// import authConfig from '@config/auth';
// import AppError from '@errors/AppError';
// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import IRolesRepository from '@security/roles/repositories/IRolesRepository';

// interface IRequest {
//   username: string;
//   password: string;
// }

// interface IResponse {
//   user: User;
//   token: string;
// }

// @injectable()
// class AuthenticateUserService {
//   constructor(
//     @inject('UsersRepository')
//     private usersRepository: IUsersRepository,
//     @inject('RolesRepository')
//     private rolesRepository: IRolesRepository,
//   ) {}

//   public async execute({ username, password }: IRequest): Promise<IResponse> {
//     const user = await this.usersRepository.findByUsername(username);

//     if (!user) {
//       throw new AppError('Username ou senha incorretos', 401);
//     }

//     const passwordMatched = await compare(password, user.password);

//     if (!passwordMatched) {
//       throw new AppError('Username ou senha incorretos', 401);
//     }

//     const { secret, expiresIn } = authConfig;

//     const token = sign({}, secret, {
//       expiresIn: expiresIn,
//       subject: user.id,
//     });

//     return { user, token };
//   }
// }

// export default AuthenticateUserService;
