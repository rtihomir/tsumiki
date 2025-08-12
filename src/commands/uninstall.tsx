import * as path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { Box, Newline, render, Text } from "ink";
import React, { useEffect, useState } from "react";

type UninstallStatus =
  | "starting"
  | "checking"
  | "removing"
  | "completed"
  | "error"
  | "not_found";

const UninstallComponent: React.FC = () => {
  const [status, setStatus] = useState<UninstallStatus>("starting");
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performUninstall = async (): Promise<void> => {
      try {
        setStatus("checking");

        // Get current directory
        const currentDir = process.cwd();
        const targetDir = path.join(currentDir, ".claude", "commands");

        // Check if .claude/commands directory exists
        const dirExists = await fs.pathExists(targetDir);
        if (!dirExists) {
          setStatus("not_found");
          setTimeout(() => {
            process.exit(0);
          }, 2000);
          return;
        }

        // Get tsumiki commands directory
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // After build, references dist/commands (since cli.js is in dist/)
        const tsumikiDir = path.join(__dirname, "commands");

        // Get tsumiki file list
        const tsumikiFiles = await fs.readdir(tsumikiDir);
        const tsumikiTargetFiles = tsumikiFiles.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh"),
        );

        setStatus("removing");

        // Check files in .claude/commands and remove only tsumiki-origin files
        const installedFiles = await fs.readdir(targetDir);
        const removedFilesList: string[] = [];

        for (const file of installedFiles) {
          if (tsumikiTargetFiles.includes(file)) {
            const filePath = path.join(targetDir, file);
            await fs.remove(filePath);
            removedFilesList.push(file);
          }
        }

        // Check if .claude/commands directory is empty after removal
        const remainingFiles = await fs.readdir(targetDir);
        if (remainingFiles.length === 0) {
          // Remove empty directory
          await fs.rmdir(targetDir);
          // Remove .claude directory if it's also empty
          const claudeDir = path.dirname(targetDir);
          const claudeFiles = await fs.readdir(claudeDir);
          if (claudeFiles.length === 0) {
            await fs.rmdir(claudeDir);
          }
        }

        setRemovedFiles(removedFilesList);
        setStatus("completed");

        // Exit after 2 seconds
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

    performUninstall();
  }, []);

  if (status === "starting") {
    return (
      <Box>
        <Text color="cyan">🗑️ Starting Tsumiki uninstallation...</Text>
      </Box>
    );
  }

  if (status === "checking") {
    return (
      <Box>
        <Text color="yellow">📋 Checking installation status...</Text>
      </Box>
    );
  }

  if (status === "removing") {
    return (
      <Box>
        <Text color="blue">🗑️ Removing command templates...</Text>
      </Box>
    );
  }

  if (status === "not_found") {
    return (
      <Box flexDirection="column">
        <Text color="yellow">⚠️ .claude/commands directory not found</Text>
        <Text color="gray">Tsumiki does not appear to be installed.</Text>
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

  if (status === "completed") {
    if (removedFiles.length === 0) {
      return (
        <Box flexDirection="column">
          <Text color="yellow">⚠️ No files to remove were found</Text>
          <Text color="gray">
            Tsumiki commands do not appear to be installed.
          </Text>
        </Box>
      );
    }

    return (
      <Box flexDirection="column">
        <Text color="green">✅ Uninstallation completed!</Text>
        <Newline />
        <Text>Removed files ({removedFiles.length} files):</Text>
        {removedFiles.map((file) => (
          <Text key={file} color="gray">
            {" "}
            • {file}
          </Text>
        ))}
        <Newline />
        <Text color="cyan">
          Tsumiki Claude Code command templates have been removed.
        </Text>
      </Box>
    );
  }

  return null;
};

export const uninstallCommand = (): void => {
  render(React.createElement(UninstallComponent));
};
