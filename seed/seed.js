import { PrismaClient } from '@prisma/client';
import { data } from './data.js';

const prisma = new PrismaClient();

async function main() {

  //* Clean database

  await prisma.user.deleteMany();

  const { users } = data;

  //* Insert
  await prisma.user.createMany( {
    data: users
  } );

  console.log( 'database seeded!' );
}

( () => {

  // if ( import.meta.env.NODE_ENV === 'production' ) return;

  main();
} )();