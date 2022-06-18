import { extname } from "path";
import { readdirSync } from "fs";

export const getFilesFromDir = async dir => readdirSync(dir).filter(file => extname(file).toLowerCase() === ".jpg" || extname(file).toLowerCase() === ".jpeg");
