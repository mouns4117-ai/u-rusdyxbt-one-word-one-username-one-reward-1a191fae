// One Word, One Username, One Reward — make.fun entry.
//
// The entry is the entrant's own make.fun handle, one word and nothing else.
// The judge's first criterion is that the text is a real make.fun username,
// the entrant's own handle sent as a single word — so this program writes
// exactly that handle, "mouns", to /output/entry.txt: 5 characters, inside
// the kit's 1-30 character gate, no trailing newline, no padding, no gloss.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "mouns";
const MIN_LEN = 1;
const MAX_LEN = 30;

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  if (USERNAME.length < MIN_LEN || USERNAME.length > MAX_LEN) {
    throw new Error(`username ${USERNAME.length} chars, outside ${MIN_LEN}-${MAX_LEN} gate`);
  }
  if (USERNAME.trim().length === 0) {
    throw new Error("username must not be whitespace-only");
  }
  if (/\s/.test(USERNAME)) {
    throw new Error("username must be a single word with no spaces");
  }
  emptyDir(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, USERNAME, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== USERNAME) {
    throw new Error("entry.txt does not hold exactly the username");
  }
  console.log(`wrote ${USERNAME.length} character(s) to ${target}`);
}

main();
