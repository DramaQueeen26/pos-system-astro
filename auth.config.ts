import bcrypt from 'bcryptjs';
import Credentials from '@auth/core/providers/credentials';
import { defineConfig } from 'auth-astro';
import { prisma } from '@/database/prisma';
import type { AdapterUser } from '@auth/core/adapters';

export default defineConfig( {
  providers: [
    Credentials( {
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async ( { email, password } ) => {
        const user = await prisma.user.findUnique( {
          where: {
            email: email as string
          }
        } );

        if ( !user ) {
          throw new Error( 'User not found' );
        }

        if ( !bcrypt.compareSync( password as string, user.password ) ) {
          throw new Error( 'Invalid password' );
        }

        const { password: _, ...rest } = user;

        return rest;
      }
    } )
  ],

  callbacks: {
    jwt: ( { token, user } ) => {
      if ( user ) {
        token.user = user;
      }

      return token;
    },

    session: ( { session, token } ) => {
      session.user = token.user as AdapterUser;
      return session;
    },
  },
} );