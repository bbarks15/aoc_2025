import { Context, Effect, Layer } from "effect";
import { FileSystem } from "@effect/platform";
import { PlatformError } from "@effect/platform/Error";
import { BunFileSystem } from "@effect/platform-bun";

export class InputReader extends Context.Tag("@advent/InputReader")<
  InputReader,
  {
    readonly readInput: (
      filePath: string,
    ) => Effect.Effect<string, PlatformError>;
    readonly readInputLines: (
      filePath: string,
    ) => Effect.Effect<string[], PlatformError>;
    readonly readInputNumbers: (
      filePath: string,
    ) => Effect.Effect<number[], PlatformError>;
    readonly readInputGroups: (
      filePath: string,
    ) => Effect.Effect<string[][], PlatformError>;
  }
>() {
  static readonly layer = Layer.effect(
    InputReader,
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      const readInput = Effect.fn("InputReader.readInput")(function* (
        filePath: string,
      ) {
        const content = yield* fs.readFileString(filePath);
        return content.trim();
      });

      const readInputLines = Effect.fn("InputReader.readInputLines")(function* (
        filePath: string,
      ) {
        const content = yield* readInput(filePath);
        return content.split("\n").filter((line) => line.length > 0);
      });

      const readInputNumbers = Effect.fn("InputReader.readInputNumbers")(
        function* (filePath: string) {
          const lines = yield* readInputLines(filePath);
          return lines
            .map((line) => parseInt(line, 10))
            .filter((n) => !isNaN(n));
        },
      );

      const readInputGroups = Effect.fn("InputReader.readInputGroups")(
        function* (filePath: string) {
          const content = yield* readInput(filePath);
          const groups = content.split("\n\n");
          return groups.map((group) =>
            group.split("\n").filter((line) => line.length > 0),
          );
        },
      );

      return InputReader.of({
        readInput,
        readInputLines,
        readInputNumbers,
        readInputGroups,
      });
    }),
  );
}

export const InputReaderLive = InputReader.layer.pipe(
  Layer.provide(BunFileSystem.layer),
);
