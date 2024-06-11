/* eslint-disable no-console */
import { IS_DEV, ORIGIN, PROTOCOL, VERCEL_URL } from "../utils/vars";

const main = () => {
  console.log("\n*************************\n");
  console.log(`IS_DEV: ${IS_DEV}`);
  console.log(`VERCEL_URL: ${VERCEL_URL}`);
  console.log(`ORIGIN: ${ORIGIN}`);
  console.log(`PROTOCOL: ${PROTOCOL}`);
  console.log("\n*************************\n");
};

main();
