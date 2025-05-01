import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '8d8a680baa3e2077177ad4949c7901db53b34b01', queries,  });
export default client;
  