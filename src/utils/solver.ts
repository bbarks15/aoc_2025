import type { PlatformError } from "@effect/platform/Error";
import { Context, Effect } from "effect";

export const Solver =
  <Id extends string>(id: Id) =>
  <Self, Input, Output>() =>
    class extends Context.Tag(`Solver<${id}>`)<
      Self,
      {
        readonly parseInput: (
          inputFile: string,
        ) => Effect.Effect<Input, PlatformError>;
        readonly solvePart1: (input: Input) => Effect.Effect<Output>;
        readonly solvePart2: (input: Input) => Effect.Effect<Output>;
      }
    >() {};

