import mri from "mri";

export interface CliArgs {
  _: string;
  help: boolean;
  version: boolean;
  format: string;
}

export function parseArgs(argv: string[]): CliArgs {
  const args = (mri(argv, {
    string: ["format"],
    boolean: ["help", "version"],
    alias: {
      f: "format",
      h: "help",
      v: "version"
    }
  }) as any) as CliArgs;

  if (!args.help && !args.version) {
    if (!args._.length) {
      throw new Error(
        "Please specify a valid commit range in the form of mytag..HEAD"
      );
    }
  }

  return args;
}

export const help = `
🔍 Autogenerate a Changelog based on merged PRs

Usage:
  $ changelogged [options] <range>

Options:
  --format, -f    Format changelog entry
  --help, -h      Show usage information and the options listed here
  --version, -v   Show version information

Examples:
  Get all PRs made starting from a git tag
  $ changelogged v1.2.0..HEAD

  Get all PRs since commit "abc"
  $ changelogged abc..HEAD

  Format output:
  $ changelogged --format='PR: %n, msg: %m, author: %a' v1..HEAD
`;
