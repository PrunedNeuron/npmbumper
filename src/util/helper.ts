import fs from "fs";
import path from "path";
import prettier from "prettier";
import vscode from "vscode";

import Dependency from "../model/Dependency";

export async function packageJsonExists(): Promise<boolean> {
	if (vscode.workspace.rootPath) {
		const files = await vscode.workspace.findFiles("package.json");
		if (files && files.length > 0) {
			return true;
		}
	}

	return false;
}

// TODO: write to package.json
export async function writeJsonFile(file: string, contents: string): Promise<void> {
	const encoded = new TextEncoder().encode(contents);
	const buffer = Buffer.from(contents);

	const filePath = path.join(vscode.workspace.rootPath || "", file);
	fs.writeFileSync(filePath, prettier.format(contents, { parser: "json" }), "utf8");
	// vscode.workspace.fs.writeFile(vscode.Uri.file(file), buffer);
}

export async function getPackageJson(): Promise<string> {
	const document = await vscode.workspace.openTextDocument(
		`${vscode.workspace.rootPath}/package.json`
	);
	return document.getText();
}

export function getArrayFromObject(object: any): Dependency[] {
	return Object.keys(object).map((key) => new Dependency(key, object[key]));
}

export function getObjectFromArray(array: Dependency[]): Dependencies {
	const object: Dependencies = {};
	array.forEach((element: Dependency) => {
		object[element.getObject().name] = element.getObject().latestVersion;
	});
	return object;
}
