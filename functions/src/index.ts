import * as admin from 'firebase-admin';
import {getAuth} from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
const Webflow = require('webflow-api');
// eslint-disable-next-line max-len
const CLIENT_ID = '';
// eslint-disable-next-line max-len
const CLIENT_SECRET = '';
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp({
  serviceAccountId: 'functionstestpoojesh12@appspot.gserviceaccount.com',
});

export const helloWorld = functions.https.onRequest(
    (_, response: { send: (arg0: string) => void }) => {
      functions.logger.info('Hello logs!', {structuredData: true});
      response.send('Hello from Firebase!');
    }
);

export const signIn = functions.https.onRequest(
    async (request, response) => {
      const webflow = new Webflow();

      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept');
      try {
        const auth = await webflow.accessToken({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: request.query.code,
        });

        const app = new Webflow({token: auth.access_token});

        const user = await app.authenticatedUser();

        // const sites = await app.sites();
        // console.log('sites ========', JSON.stringify(sites));

        // sites.forEach((site) => {
        //   const siteValue = site.shortName;
        //   const siteUrl = `https://webflow.com/dashboard/sites/${siteValue}/code`;
        //   console.log({siteUrl});
        // });

        const adminAuth = await getAuth();
        const newToken = await adminAuth.createCustomToken(user.user._id);
        response.json({
          token: newToken,
          user,
        });
      } catch (err: any) {
        response.json({
          errr: err.message,
        });
      }
    }
);
