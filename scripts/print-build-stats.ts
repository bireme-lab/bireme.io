/* eslint-disable no-console */
import { DEPLOYMENT_URL, IS_DEV, ORIGIN, PROTOCOL } from "../utils/vars";

const main = () => {
  console.log("\n*************************\n");
  console.log(`IS_DEV: ${IS_DEV}`);
  console.log(`DEPLOYMENT_URL: ${DEPLOYMENT_URL}`);
  console.log(`ORIGIN: ${ORIGIN}`);
  console.log(`PROTOCOL: ${PROTOCOL}`);
  console.log("\n*************************\n");
};

main();
