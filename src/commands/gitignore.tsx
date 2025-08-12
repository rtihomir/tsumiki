import * as path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { Box, Newline, render, Text } from "ink";
import React, { useEffect, useState } from "react";

type GitignoreStatus =
  | "starting"
  | "checking"
  | "updating"
  | "completed"
  | "skipped"
  | "error";

const GitignoreComponent: React.FC = () => {
  const [status, setStatus] = useState<GitignoreStatus>("starting");
  const [addedRules, setAddedRules] = useState<string[]>([]);
  const [skippedRules, setSkippedRules] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performGitignoreUpdate = async (): Promise<void> => {
      try {
        setStatus("checking");

        const currentDir = process.cwd();
        const gitignorePath = path.join(currentDir, ".gitignore");

        // Get tsumiki commands directory
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // After build, references dist/commands (since cli.js is in dist/)
        const tsumikiDir = path.join(__dirname, "commands");

        // Get all .md and .sh files in commands directory
        const files = await fs.readdir(tsumikiDir);
        const targetFiles = files.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh"),
        );

        // Create rules using specific file paths
        const rulesToAdd = targetFiles.map(
          (file) => `.claude/commands/${file}`,
        );

        let gitignoreContent = "";
        let gitignoreExists = false;

        try {
          gitignoreContent = await fs.readFile(gitignorePath, "utf-8");
          gitignoreExists = true;
        } catch {
          gitignoreExists = false;
        }

        const existingLines = gitignoreContent
          .split("\n")
          .map((line) => line.trim());
        const rulesToActuallyAdd: string[] = [];
        const rulesAlreadyExist: string[] = [];

        for (const rule of rulesToAdd) {
          if (existingLines.includes(rule)) {
            rulesAlreadyExist.push(rule);
          } else {
            rulesToActuallyAdd.push(rule);
          }
        }

        if (rulesToActuallyAdd.length === 0) {
          setSkippedRules(rulesAlreadyExist);
          setStatus("skipped");
          setTimeout(() => {
            process.exit(0);
          }, 2000);
          return;
        }

        setStatus("updating");

        let newContent = gitignoreContent;
        if (
          gitignoreExists &&
          gitignoreContent.length > 0 &&
          !gitignoreContent.endsWith("\n")
        ) {
          newContent += "\n";
        }

        if (gitignoreExists && gitignoreContent.length > 0) {
          newContent += "\n# Tsumiki command templates\n";
        } else {
          newContent = "# Tsumiki command templates\n";
        }

        for (const rule of rulesToActuallyAdd) {
          newContent += `${rule}\n`;
        }

        await fs.writeFile(gitignorePath, newContent);

        setAddedRules(rulesToActuallyAdd);
        setSkippedRules(rulesAlreadyExist);
        setStatus("completed");

        setTimeout(() => {
          process.exit(0);
        }, 2000);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setStatus("error");

        setTimeout(() => {
          process.exit(1);
        }, 3000);
      }
    };

    performGitignoreUpdate();
  }, []);

  if (status === "starting") {
    return (
      <Box>
        <Text color="cyan">🚀 Starting .gitignore update...</Text>
      </Box>
    );
  }

  if (status === "checking") {
    return (
      <Box>
        <Text color="yellow">📋 Checking .gitignore file...</Text>
      </Box>
    );
  }

  if (status === "updating") {
    return (
      <Box>
        <Text color="blue">✏️ Updating .gitignore...</Text>
      </Box>
    );
  }

  if (status === "error") {
    return (
      <Box flexDirection="column">
        <Text color="red">❌ An error occurred:</Text>
        <Text color="red">{error}</Text>
      </Box>
    );
  }

  if (status === "skipped") {
    return (
      <Box flexDirection="column">
        <Text color="yellow">⏭️ All rules already exist</Text>
        <Newline />
        <Text>Existing rules:</Text>
        {skippedRules.map((rule) => (
          <Text key={rule} color="gray">
            • {rule}
          </Text>
        ))}
        <Newline />
        <Text color="cyan">.gitignore update was not necessary</Text>
      </Box>
    );
  }

  if (status === "completed") {
    return (
      <Box flexDirection="column">
        <Text color="green">✅ .gitignore update completed!</Text>
        <Newline />
        {addedRules.length > 0 && (
          <>
            <Text>Added rules ({addedRules.length} rules):</Text>
            {addedRules.map((rule) => (
              <Text key={rule} color="green">
                • {rule}
              </Text>
            ))}
          </>
        )}
        {skippedRules.length > 0 && (
          <>
            <Text>Existing rules ({skippedRules.length} rules):</Text>
            {skippedRules.map((rule) => (
              <Text key={rule} color="gray">
                • {rule}
              </Text>
            ))}
          </>
        )}
        <Newline />
        <Text color="cyan">
          Tsumiki command files will now be ignored by Git
        </Text>
      </Box>
    );
  }

  return null;
};

export const gitignoreCommand = (): void => {
  render(React.createElement(GitignoreComponent));
};
