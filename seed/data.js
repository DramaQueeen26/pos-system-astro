import bcrypt from 'bcryptjs';

export const data = {
  users: [
    {
      email: 'test@test.com',
      name: 'Test',
      password: bcrypt.hashSync( '123456' ),
      role: 'ADMIN'
    },
    {
      email: 'test2@test.com',
      name: 'Test2',
      password: bcrypt.hashSync( '123456' ),
      role: 'USER'
    }

  ],
};
