import * as vscode from "vscode";

export default class StatusBarItem {
	private statusBarItem: vscode.StatusBarItem;

	// Initialize the status bar item
	constructor() {
		this.statusBarItem = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Right,
			150
		);

		this.statusBarItem.show();
	}

	// Returns the status bar item
	get(): vscode.StatusBarItem {
		return this.statusBarItem;
	}

	// Sets the command to be executed on click
	setCommand(command: string): void {
		this.statusBarItem.command = command;
	}

	// Update the status bar item display text
	updateText(text: string): void {
		this.statusBarItem.text = text;
	}

	// Update the status bar item tooltip text
	updateTooltip(tooltip: string): void {
		this.statusBarItem.tooltip = tooltip;
	}
}
