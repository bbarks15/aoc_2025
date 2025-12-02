import { BunRuntime } from "@effect/platform-bun";
import { Effect, Schema } from "effect";
import { InputReader, InputReaderLive } from "~/utils/input";

const Direction = Schema.Literal("L", "R");
type Direction = typeof Direction.Type;

const RotationTuple = Schema.TemplateLiteralParser(Direction, Schema.Int);

class Rotation extends Schema.Class<Rotation>("Rotation")({
  direction: Direction,
  distance: Schema.Int,
}) {
  static fromString = Schema.transform(
    RotationTuple,
    Schema.typeSchema(Rotation),
    {
      decode: ([direction, distance]) => Rotation.make({ direction, distance }),
      encode: (r) => [r.direction, r.distance] as const,
    },
  );
}

const Rotations = Schema.compose(
  Schema.Trim,
  Schema.compose(Schema.split("\n"), Schema.Array(Rotation.fromString)),
);

const parseInput = Effect.fn("parseInput")(function* (inputFile: string) {
  const inputReader = yield* InputReader;
  const content = yield* inputReader.readInput(inputFile);

  return yield* Schema.decode(Rotations)(content);
});

export const solvePart1 = Effect.fn("solvePart1")(function* (
  input: typeof Rotations.Type,
) {
  let position = 50;
  let zeroCount = 0;

  for (const { direction, distance } of input) {
    const movement = direction === "L" ? -distance : distance;
    position = (position + movement + 100) % 100;

    if (position === 0) zeroCount++;
  }

  return zeroCount;
});

export const solvePart2 = Effect.fn("solvePart2")(function* (
  input: typeof Rotations.Type,
) {
  let position = 50;
  let totalZeroCount = 0;

  for (const { direction, distance } of input) {
    const step = direction === "L" ? -1 : 1;

    for (let i = 0; i < distance; i++) {
      position = (position + step + 100) % 100;
      if (position === 0) totalZeroCount++;
    }
  }

  return totalZeroCount;
});

export const program = Effect.gen(function* () {
  const input = yield* parseInput("inputs/2025/day1.txt");

  const part1 = yield* solvePart1(input);
  const part2 = yield* solvePart2(input);

  yield* Effect.logInfo(`Part 1: ${part1}`);
  yield* Effect.logInfo(`Part 2: ${part2}`);
});

program.pipe(Effect.provide(InputReaderLive), BunRuntime.runMain);
