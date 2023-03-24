import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(
  (request: any, response: { send: (arg0: string) => void }) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);
