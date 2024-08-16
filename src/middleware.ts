import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const notAuthenticatedRoutes = [ '/' ];

export const onRequest = defineMiddleware(
  async ( { url, redirect, request }, next ) => {
    const session = await getSession( request )!!;

    if ( !session && url.pathname.startsWith( '/dashboard' ) ) {
      return redirect( '/' );
    }

    if ( session && notAuthenticatedRoutes.includes( url.pathname ) ) {
      return redirect( '/dashboard' );
    }

    return next();
  }
);