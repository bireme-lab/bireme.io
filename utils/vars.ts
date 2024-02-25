import { envs } from "../publicEnvs";

export const IS_DEV = envs.NEXT_PUBLIC_HOST === "localhost";
export const PROTOCOL = IS_DEV ? "http" : "https";
export const ORIGIN = `${PROTOCOL}://${envs.NEXT_PUBLIC_HOST}${IS_DEV ? ":3000" : ""}`;
