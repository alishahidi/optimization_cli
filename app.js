#!/usr/bin/env node

import gradient from "gradient-string";
import figlet from "figlet";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import ora from "ora";
import chalk from "chalk";
import { getFilesFromDir } from "./utils/path.js"
import optimize from "./utils/optimize.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const banner = async () => {
	console.log("\n");
	console.log(gradient.pastel(figlet.textSync("Optimization Util", { font: "Small" })));
	console.log("\n");
};

await banner();

yargs(hideBin(process.argv))
	.scriptName("optimization-util")
	.usage("node app.js $0 [arguments] [options]")
	.command('opt [indirectory] [outdirectory] [quality]', 'optimize image in directory with quality you get', (yargs) => {
		return yargs
			.positional('indirectory', {
				describe: 'image absolute path input director',
			})
			.positional('outdirectory', {
				describe: 'image absolute path output director',
			})
			.positional('quality', {
				describe: 'image quality (100-0) ex: 45'
			}).option('s', {
				alias: 'startpoint',
				type: 'number',
				description: 'image name number start point',
				nargs: 1
			})

	}, async (argv) => {
		const { startpoint, indirectory, outdirectory, quality } = argv;
		const files = await getFilesFromDir(indirectory);
		if (argv.startpoint) {
			console.log("\n");
			let startNumber = (+ startpoint);
			for (const fileName of files){
				await optimize(indirectory + "/" + fileName, + quality, outdirectory + "/" + startNumber + ".jpg");
				console.log("[" + chalk.green("Optimized!") + "] " + "[" + chalk.redBright(quality + "%") + "] && " + chalk.blue(fileName) + " => " + chalk.magentaBright(startNumber + ".jpg"));
				startNumber++;
			}
		} else {
			for (const fileName of files){
				await optimize(indirectory + "/" + fileName, + quality, outdirectory + "/" + "opt" + fileName);
				console.log("[" + chalk.green("Optimized!") + "] " + "[" + chalk.redBright(quality + "%") + "] && " + chalk.blue(fileName));
			}
		}
		console.log("\n");
		await delay(500);
		const loader = ora("Optimized Successfully.").succeed();
		loader.stop();
		console.log("\n");
	})
	.parse()
