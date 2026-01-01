
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model TrainingBlock
 * 
 */
export type TrainingBlock = $Result.DefaultSelection<Prisma.$TrainingBlockPayload>
/**
 * Model TrainingWeek
 * 
 */
export type TrainingWeek = $Result.DefaultSelection<Prisma.$TrainingWeekPayload>
/**
 * Model TrainingDay
 * 
 */
export type TrainingDay = $Result.DefaultSelection<Prisma.$TrainingDayPayload>
/**
 * Model ExerciseGroup
 * 
 */
export type ExerciseGroup = $Result.DefaultSelection<Prisma.$ExerciseGroupPayload>
/**
 * Model Exercise
 * 
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model DayExercise
 * 
 */
export type DayExercise = $Result.DefaultSelection<Prisma.$DayExercisePayload>
/**
 * Model DayExerciseSeries
 * 
 */
export type DayExerciseSeries = $Result.DefaultSelection<Prisma.$DayExerciseSeriesPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  admin: 'admin',
  athlete: 'athlete'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more TrainingBlocks
 * const trainingBlocks = await prisma.trainingBlock.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more TrainingBlocks
   * const trainingBlocks = await prisma.trainingBlock.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.trainingBlock`: Exposes CRUD operations for the **TrainingBlock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingBlocks
    * const trainingBlocks = await prisma.trainingBlock.findMany()
    * ```
    */
  get trainingBlock(): Prisma.TrainingBlockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingWeek`: Exposes CRUD operations for the **TrainingWeek** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingWeeks
    * const trainingWeeks = await prisma.trainingWeek.findMany()
    * ```
    */
  get trainingWeek(): Prisma.TrainingWeekDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingDay`: Exposes CRUD operations for the **TrainingDay** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingDays
    * const trainingDays = await prisma.trainingDay.findMany()
    * ```
    */
  get trainingDay(): Prisma.TrainingDayDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exerciseGroup`: Exposes CRUD operations for the **ExerciseGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExerciseGroups
    * const exerciseGroups = await prisma.exerciseGroup.findMany()
    * ```
    */
  get exerciseGroup(): Prisma.ExerciseGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exercises
    * const exercises = await prisma.exercise.findMany()
    * ```
    */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dayExercise`: Exposes CRUD operations for the **DayExercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DayExercises
    * const dayExercises = await prisma.dayExercise.findMany()
    * ```
    */
  get dayExercise(): Prisma.DayExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dayExerciseSeries`: Exposes CRUD operations for the **DayExerciseSeries** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DayExerciseSeries
    * const dayExerciseSeries = await prisma.dayExerciseSeries.findMany()
    * ```
    */
  get dayExerciseSeries(): Prisma.DayExerciseSeriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    TrainingBlock: 'TrainingBlock',
    TrainingWeek: 'TrainingWeek',
    TrainingDay: 'TrainingDay',
    ExerciseGroup: 'ExerciseGroup',
    Exercise: 'Exercise',
    User: 'User',
    DayExercise: 'DayExercise',
    DayExerciseSeries: 'DayExerciseSeries',
    Payment: 'Payment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "trainingBlock" | "trainingWeek" | "trainingDay" | "exerciseGroup" | "exercise" | "user" | "dayExercise" | "dayExerciseSeries" | "payment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      TrainingBlock: {
        payload: Prisma.$TrainingBlockPayload<ExtArgs>
        fields: Prisma.TrainingBlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingBlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingBlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>
          }
          findFirst: {
            args: Prisma.TrainingBlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingBlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>
          }
          findMany: {
            args: Prisma.TrainingBlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>[]
          }
          create: {
            args: Prisma.TrainingBlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>
          }
          createMany: {
            args: Prisma.TrainingBlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingBlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>[]
          }
          delete: {
            args: Prisma.TrainingBlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>
          }
          update: {
            args: Prisma.TrainingBlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>
          }
          deleteMany: {
            args: Prisma.TrainingBlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingBlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingBlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>[]
          }
          upsert: {
            args: Prisma.TrainingBlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingBlockPayload>
          }
          aggregate: {
            args: Prisma.TrainingBlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingBlock>
          }
          groupBy: {
            args: Prisma.TrainingBlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingBlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingBlockCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingBlockCountAggregateOutputType> | number
          }
        }
      }
      TrainingWeek: {
        payload: Prisma.$TrainingWeekPayload<ExtArgs>
        fields: Prisma.TrainingWeekFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingWeekFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingWeekFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>
          }
          findFirst: {
            args: Prisma.TrainingWeekFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingWeekFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>
          }
          findMany: {
            args: Prisma.TrainingWeekFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>[]
          }
          create: {
            args: Prisma.TrainingWeekCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>
          }
          createMany: {
            args: Prisma.TrainingWeekCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingWeekCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>[]
          }
          delete: {
            args: Prisma.TrainingWeekDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>
          }
          update: {
            args: Prisma.TrainingWeekUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>
          }
          deleteMany: {
            args: Prisma.TrainingWeekDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingWeekUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingWeekUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>[]
          }
          upsert: {
            args: Prisma.TrainingWeekUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingWeekPayload>
          }
          aggregate: {
            args: Prisma.TrainingWeekAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingWeek>
          }
          groupBy: {
            args: Prisma.TrainingWeekGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingWeekGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingWeekCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingWeekCountAggregateOutputType> | number
          }
        }
      }
      TrainingDay: {
        payload: Prisma.$TrainingDayPayload<ExtArgs>
        fields: Prisma.TrainingDayFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingDayFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingDayFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>
          }
          findFirst: {
            args: Prisma.TrainingDayFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingDayFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>
          }
          findMany: {
            args: Prisma.TrainingDayFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>[]
          }
          create: {
            args: Prisma.TrainingDayCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>
          }
          createMany: {
            args: Prisma.TrainingDayCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingDayCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>[]
          }
          delete: {
            args: Prisma.TrainingDayDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>
          }
          update: {
            args: Prisma.TrainingDayUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>
          }
          deleteMany: {
            args: Prisma.TrainingDayDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingDayUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingDayUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>[]
          }
          upsert: {
            args: Prisma.TrainingDayUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingDayPayload>
          }
          aggregate: {
            args: Prisma.TrainingDayAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingDay>
          }
          groupBy: {
            args: Prisma.TrainingDayGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingDayGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingDayCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingDayCountAggregateOutputType> | number
          }
        }
      }
      ExerciseGroup: {
        payload: Prisma.$ExerciseGroupPayload<ExtArgs>
        fields: Prisma.ExerciseGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>
          }
          findFirst: {
            args: Prisma.ExerciseGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>
          }
          findMany: {
            args: Prisma.ExerciseGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>[]
          }
          create: {
            args: Prisma.ExerciseGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>
          }
          createMany: {
            args: Prisma.ExerciseGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>[]
          }
          delete: {
            args: Prisma.ExerciseGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>
          }
          update: {
            args: Prisma.ExerciseGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>
          }
          deleteMany: {
            args: Prisma.ExerciseGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>[]
          }
          upsert: {
            args: Prisma.ExerciseGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseGroupPayload>
          }
          aggregate: {
            args: Prisma.ExerciseGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExerciseGroup>
          }
          groupBy: {
            args: Prisma.ExerciseGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseGroupCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupCountAggregateOutputType> | number
          }
        }
      }
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>
        fields: Prisma.ExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercise>
          }
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      DayExercise: {
        payload: Prisma.$DayExercisePayload<ExtArgs>
        fields: Prisma.DayExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DayExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DayExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>
          }
          findFirst: {
            args: Prisma.DayExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DayExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>
          }
          findMany: {
            args: Prisma.DayExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>[]
          }
          create: {
            args: Prisma.DayExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>
          }
          createMany: {
            args: Prisma.DayExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DayExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>[]
          }
          delete: {
            args: Prisma.DayExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>
          }
          update: {
            args: Prisma.DayExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>
          }
          deleteMany: {
            args: Prisma.DayExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DayExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DayExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>[]
          }
          upsert: {
            args: Prisma.DayExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExercisePayload>
          }
          aggregate: {
            args: Prisma.DayExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDayExercise>
          }
          groupBy: {
            args: Prisma.DayExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<DayExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.DayExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<DayExerciseCountAggregateOutputType> | number
          }
        }
      }
      DayExerciseSeries: {
        payload: Prisma.$DayExerciseSeriesPayload<ExtArgs>
        fields: Prisma.DayExerciseSeriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DayExerciseSeriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DayExerciseSeriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>
          }
          findFirst: {
            args: Prisma.DayExerciseSeriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DayExerciseSeriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>
          }
          findMany: {
            args: Prisma.DayExerciseSeriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>[]
          }
          create: {
            args: Prisma.DayExerciseSeriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>
          }
          createMany: {
            args: Prisma.DayExerciseSeriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DayExerciseSeriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>[]
          }
          delete: {
            args: Prisma.DayExerciseSeriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>
          }
          update: {
            args: Prisma.DayExerciseSeriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>
          }
          deleteMany: {
            args: Prisma.DayExerciseSeriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DayExerciseSeriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DayExerciseSeriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>[]
          }
          upsert: {
            args: Prisma.DayExerciseSeriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DayExerciseSeriesPayload>
          }
          aggregate: {
            args: Prisma.DayExerciseSeriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDayExerciseSeries>
          }
          groupBy: {
            args: Prisma.DayExerciseSeriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<DayExerciseSeriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.DayExerciseSeriesCountArgs<ExtArgs>
            result: $Utils.Optional<DayExerciseSeriesCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    trainingBlock?: TrainingBlockOmit
    trainingWeek?: TrainingWeekOmit
    trainingDay?: TrainingDayOmit
    exerciseGroup?: ExerciseGroupOmit
    exercise?: ExerciseOmit
    user?: UserOmit
    dayExercise?: DayExerciseOmit
    dayExerciseSeries?: DayExerciseSeriesOmit
    payment?: PaymentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TrainingBlockCountOutputType
   */

  export type TrainingBlockCountOutputType = {
    weeks: number
  }

  export type TrainingBlockCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weeks?: boolean | TrainingBlockCountOutputTypeCountWeeksArgs
  }

  // Custom InputTypes
  /**
   * TrainingBlockCountOutputType without action
   */
  export type TrainingBlockCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlockCountOutputType
     */
    select?: TrainingBlockCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingBlockCountOutputType without action
   */
  export type TrainingBlockCountOutputTypeCountWeeksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingWeekWhereInput
  }


  /**
   * Count Type TrainingWeekCountOutputType
   */

  export type TrainingWeekCountOutputType = {
    trainingDays: number
    dayExerciseSeries: number
  }

  export type TrainingWeekCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingDays?: boolean | TrainingWeekCountOutputTypeCountTrainingDaysArgs
    dayExerciseSeries?: boolean | TrainingWeekCountOutputTypeCountDayExerciseSeriesArgs
  }

  // Custom InputTypes
  /**
   * TrainingWeekCountOutputType without action
   */
  export type TrainingWeekCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeekCountOutputType
     */
    select?: TrainingWeekCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingWeekCountOutputType without action
   */
  export type TrainingWeekCountOutputTypeCountTrainingDaysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingDayWhereInput
  }

  /**
   * TrainingWeekCountOutputType without action
   */
  export type TrainingWeekCountOutputTypeCountDayExerciseSeriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DayExerciseSeriesWhereInput
  }


  /**
   * Count Type TrainingDayCountOutputType
   */

  export type TrainingDayCountOutputType = {
    dayExercises: number
  }

  export type TrainingDayCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dayExercises?: boolean | TrainingDayCountOutputTypeCountDayExercisesArgs
  }

  // Custom InputTypes
  /**
   * TrainingDayCountOutputType without action
   */
  export type TrainingDayCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDayCountOutputType
     */
    select?: TrainingDayCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingDayCountOutputType without action
   */
  export type TrainingDayCountOutputTypeCountDayExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DayExerciseWhereInput
  }


  /**
   * Count Type ExerciseGroupCountOutputType
   */

  export type ExerciseGroupCountOutputType = {
    exercises: number
  }

  export type ExerciseGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercises?: boolean | ExerciseGroupCountOutputTypeCountExercisesArgs
  }

  // Custom InputTypes
  /**
   * ExerciseGroupCountOutputType without action
   */
  export type ExerciseGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroupCountOutputType
     */
    select?: ExerciseGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExerciseGroupCountOutputType without action
   */
  export type ExerciseGroupCountOutputTypeCountExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
  }


  /**
   * Count Type ExerciseCountOutputType
   */

  export type ExerciseCountOutputType = {
    dayExercises: number
  }

  export type ExerciseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dayExercises?: boolean | ExerciseCountOutputTypeCountDayExercisesArgs
  }

  // Custom InputTypes
  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseCountOutputType
     */
    select?: ExerciseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeCountDayExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DayExerciseWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    blocks: number
    payments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocks?: boolean | UserCountOutputTypeCountBlocksArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingBlockWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type DayExerciseCountOutputType
   */

  export type DayExerciseCountOutputType = {
    series: number
  }

  export type DayExerciseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    series?: boolean | DayExerciseCountOutputTypeCountSeriesArgs
  }

  // Custom InputTypes
  /**
   * DayExerciseCountOutputType without action
   */
  export type DayExerciseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseCountOutputType
     */
    select?: DayExerciseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DayExerciseCountOutputType without action
   */
  export type DayExerciseCountOutputTypeCountSeriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DayExerciseSeriesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model TrainingBlock
   */

  export type AggregateTrainingBlock = {
    _count: TrainingBlockCountAggregateOutputType | null
    _avg: TrainingBlockAvgAggregateOutputType | null
    _sum: TrainingBlockSumAggregateOutputType | null
    _min: TrainingBlockMinAggregateOutputType | null
    _max: TrainingBlockMaxAggregateOutputType | null
  }

  export type TrainingBlockAvgAggregateOutputType = {
    blockNumber: number | null
  }

  export type TrainingBlockSumAggregateOutputType = {
    blockNumber: number | null
  }

  export type TrainingBlockMinAggregateOutputType = {
    isVisible: boolean | null
    id: string | null
    blockNumber: number | null
    description: string | null
    userId: string | null
  }

  export type TrainingBlockMaxAggregateOutputType = {
    isVisible: boolean | null
    id: string | null
    blockNumber: number | null
    description: string | null
    userId: string | null
  }

  export type TrainingBlockCountAggregateOutputType = {
    isVisible: number
    id: number
    blockNumber: number
    description: number
    userId: number
    _all: number
  }


  export type TrainingBlockAvgAggregateInputType = {
    blockNumber?: true
  }

  export type TrainingBlockSumAggregateInputType = {
    blockNumber?: true
  }

  export type TrainingBlockMinAggregateInputType = {
    isVisible?: true
    id?: true
    blockNumber?: true
    description?: true
    userId?: true
  }

  export type TrainingBlockMaxAggregateInputType = {
    isVisible?: true
    id?: true
    blockNumber?: true
    description?: true
    userId?: true
  }

  export type TrainingBlockCountAggregateInputType = {
    isVisible?: true
    id?: true
    blockNumber?: true
    description?: true
    userId?: true
    _all?: true
  }

  export type TrainingBlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingBlock to aggregate.
     */
    where?: TrainingBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingBlocks to fetch.
     */
    orderBy?: TrainingBlockOrderByWithRelationInput | TrainingBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingBlocks
    **/
    _count?: true | TrainingBlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingBlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingBlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingBlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingBlockMaxAggregateInputType
  }

  export type GetTrainingBlockAggregateType<T extends TrainingBlockAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingBlock[P]>
      : GetScalarType<T[P], AggregateTrainingBlock[P]>
  }




  export type TrainingBlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingBlockWhereInput
    orderBy?: TrainingBlockOrderByWithAggregationInput | TrainingBlockOrderByWithAggregationInput[]
    by: TrainingBlockScalarFieldEnum[] | TrainingBlockScalarFieldEnum
    having?: TrainingBlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingBlockCountAggregateInputType | true
    _avg?: TrainingBlockAvgAggregateInputType
    _sum?: TrainingBlockSumAggregateInputType
    _min?: TrainingBlockMinAggregateInputType
    _max?: TrainingBlockMaxAggregateInputType
  }

  export type TrainingBlockGroupByOutputType = {
    isVisible: boolean
    id: string
    blockNumber: number
    description: string
    userId: string
    _count: TrainingBlockCountAggregateOutputType | null
    _avg: TrainingBlockAvgAggregateOutputType | null
    _sum: TrainingBlockSumAggregateOutputType | null
    _min: TrainingBlockMinAggregateOutputType | null
    _max: TrainingBlockMaxAggregateOutputType | null
  }

  type GetTrainingBlockGroupByPayload<T extends TrainingBlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingBlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingBlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingBlockGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingBlockGroupByOutputType[P]>
        }
      >
    >


  export type TrainingBlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    isVisible?: boolean
    id?: boolean
    blockNumber?: boolean
    description?: boolean
    userId?: boolean
    weeks?: boolean | TrainingBlock$weeksArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TrainingBlockCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingBlock"]>

  export type TrainingBlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    isVisible?: boolean
    id?: boolean
    blockNumber?: boolean
    description?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingBlock"]>

  export type TrainingBlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    isVisible?: boolean
    id?: boolean
    blockNumber?: boolean
    description?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingBlock"]>

  export type TrainingBlockSelectScalar = {
    isVisible?: boolean
    id?: boolean
    blockNumber?: boolean
    description?: boolean
    userId?: boolean
  }

  export type TrainingBlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"isVisible" | "id" | "blockNumber" | "description" | "userId", ExtArgs["result"]["trainingBlock"]>
  export type TrainingBlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weeks?: boolean | TrainingBlock$weeksArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TrainingBlockCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingBlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrainingBlockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrainingBlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingBlock"
    objects: {
      weeks: Prisma.$TrainingWeekPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      isVisible: boolean
      id: string
      blockNumber: number
      description: string
      userId: string
    }, ExtArgs["result"]["trainingBlock"]>
    composites: {}
  }

  type TrainingBlockGetPayload<S extends boolean | null | undefined | TrainingBlockDefaultArgs> = $Result.GetResult<Prisma.$TrainingBlockPayload, S>

  type TrainingBlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingBlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingBlockCountAggregateInputType | true
    }

  export interface TrainingBlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingBlock'], meta: { name: 'TrainingBlock' } }
    /**
     * Find zero or one TrainingBlock that matches the filter.
     * @param {TrainingBlockFindUniqueArgs} args - Arguments to find a TrainingBlock
     * @example
     * // Get one TrainingBlock
     * const trainingBlock = await prisma.trainingBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingBlockFindUniqueArgs>(args: SelectSubset<T, TrainingBlockFindUniqueArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingBlock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingBlockFindUniqueOrThrowArgs} args - Arguments to find a TrainingBlock
     * @example
     * // Get one TrainingBlock
     * const trainingBlock = await prisma.trainingBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingBlockFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingBlockFindFirstArgs} args - Arguments to find a TrainingBlock
     * @example
     * // Get one TrainingBlock
     * const trainingBlock = await prisma.trainingBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingBlockFindFirstArgs>(args?: SelectSubset<T, TrainingBlockFindFirstArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingBlockFindFirstOrThrowArgs} args - Arguments to find a TrainingBlock
     * @example
     * // Get one TrainingBlock
     * const trainingBlock = await prisma.trainingBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingBlockFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingBlocks
     * const trainingBlocks = await prisma.trainingBlock.findMany()
     * 
     * // Get first 10 TrainingBlocks
     * const trainingBlocks = await prisma.trainingBlock.findMany({ take: 10 })
     * 
     * // Only select the `isVisible`
     * const trainingBlockWithIsVisibleOnly = await prisma.trainingBlock.findMany({ select: { isVisible: true } })
     * 
     */
    findMany<T extends TrainingBlockFindManyArgs>(args?: SelectSubset<T, TrainingBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingBlock.
     * @param {TrainingBlockCreateArgs} args - Arguments to create a TrainingBlock.
     * @example
     * // Create one TrainingBlock
     * const TrainingBlock = await prisma.trainingBlock.create({
     *   data: {
     *     // ... data to create a TrainingBlock
     *   }
     * })
     * 
     */
    create<T extends TrainingBlockCreateArgs>(args: SelectSubset<T, TrainingBlockCreateArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingBlocks.
     * @param {TrainingBlockCreateManyArgs} args - Arguments to create many TrainingBlocks.
     * @example
     * // Create many TrainingBlocks
     * const trainingBlock = await prisma.trainingBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingBlockCreateManyArgs>(args?: SelectSubset<T, TrainingBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingBlocks and returns the data saved in the database.
     * @param {TrainingBlockCreateManyAndReturnArgs} args - Arguments to create many TrainingBlocks.
     * @example
     * // Create many TrainingBlocks
     * const trainingBlock = await prisma.trainingBlock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingBlocks and only return the `isVisible`
     * const trainingBlockWithIsVisibleOnly = await prisma.trainingBlock.createManyAndReturn({
     *   select: { isVisible: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingBlockCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingBlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingBlock.
     * @param {TrainingBlockDeleteArgs} args - Arguments to delete one TrainingBlock.
     * @example
     * // Delete one TrainingBlock
     * const TrainingBlock = await prisma.trainingBlock.delete({
     *   where: {
     *     // ... filter to delete one TrainingBlock
     *   }
     * })
     * 
     */
    delete<T extends TrainingBlockDeleteArgs>(args: SelectSubset<T, TrainingBlockDeleteArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingBlock.
     * @param {TrainingBlockUpdateArgs} args - Arguments to update one TrainingBlock.
     * @example
     * // Update one TrainingBlock
     * const trainingBlock = await prisma.trainingBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingBlockUpdateArgs>(args: SelectSubset<T, TrainingBlockUpdateArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingBlocks.
     * @param {TrainingBlockDeleteManyArgs} args - Arguments to filter TrainingBlocks to delete.
     * @example
     * // Delete a few TrainingBlocks
     * const { count } = await prisma.trainingBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingBlockDeleteManyArgs>(args?: SelectSubset<T, TrainingBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingBlocks
     * const trainingBlock = await prisma.trainingBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingBlockUpdateManyArgs>(args: SelectSubset<T, TrainingBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingBlocks and returns the data updated in the database.
     * @param {TrainingBlockUpdateManyAndReturnArgs} args - Arguments to update many TrainingBlocks.
     * @example
     * // Update many TrainingBlocks
     * const trainingBlock = await prisma.trainingBlock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingBlocks and only return the `isVisible`
     * const trainingBlockWithIsVisibleOnly = await prisma.trainingBlock.updateManyAndReturn({
     *   select: { isVisible: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingBlockUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingBlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingBlock.
     * @param {TrainingBlockUpsertArgs} args - Arguments to update or create a TrainingBlock.
     * @example
     * // Update or create a TrainingBlock
     * const trainingBlock = await prisma.trainingBlock.upsert({
     *   create: {
     *     // ... data to create a TrainingBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingBlock we want to update
     *   }
     * })
     */
    upsert<T extends TrainingBlockUpsertArgs>(args: SelectSubset<T, TrainingBlockUpsertArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingBlockCountArgs} args - Arguments to filter TrainingBlocks to count.
     * @example
     * // Count the number of TrainingBlocks
     * const count = await prisma.trainingBlock.count({
     *   where: {
     *     // ... the filter for the TrainingBlocks we want to count
     *   }
     * })
    **/
    count<T extends TrainingBlockCountArgs>(
      args?: Subset<T, TrainingBlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingBlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingBlockAggregateArgs>(args: Subset<T, TrainingBlockAggregateArgs>): Prisma.PrismaPromise<GetTrainingBlockAggregateType<T>>

    /**
     * Group by TrainingBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingBlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingBlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingBlockGroupByArgs['orderBy'] }
        : { orderBy?: TrainingBlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingBlock model
   */
  readonly fields: TrainingBlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingBlock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingBlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    weeks<T extends TrainingBlock$weeksArgs<ExtArgs> = {}>(args?: Subset<T, TrainingBlock$weeksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingBlock model
   */
  interface TrainingBlockFieldRefs {
    readonly isVisible: FieldRef<"TrainingBlock", 'Boolean'>
    readonly id: FieldRef<"TrainingBlock", 'String'>
    readonly blockNumber: FieldRef<"TrainingBlock", 'Int'>
    readonly description: FieldRef<"TrainingBlock", 'String'>
    readonly userId: FieldRef<"TrainingBlock", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TrainingBlock findUnique
   */
  export type TrainingBlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * Filter, which TrainingBlock to fetch.
     */
    where: TrainingBlockWhereUniqueInput
  }

  /**
   * TrainingBlock findUniqueOrThrow
   */
  export type TrainingBlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * Filter, which TrainingBlock to fetch.
     */
    where: TrainingBlockWhereUniqueInput
  }

  /**
   * TrainingBlock findFirst
   */
  export type TrainingBlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * Filter, which TrainingBlock to fetch.
     */
    where?: TrainingBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingBlocks to fetch.
     */
    orderBy?: TrainingBlockOrderByWithRelationInput | TrainingBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingBlocks.
     */
    cursor?: TrainingBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingBlocks.
     */
    distinct?: TrainingBlockScalarFieldEnum | TrainingBlockScalarFieldEnum[]
  }

  /**
   * TrainingBlock findFirstOrThrow
   */
  export type TrainingBlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * Filter, which TrainingBlock to fetch.
     */
    where?: TrainingBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingBlocks to fetch.
     */
    orderBy?: TrainingBlockOrderByWithRelationInput | TrainingBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingBlocks.
     */
    cursor?: TrainingBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingBlocks.
     */
    distinct?: TrainingBlockScalarFieldEnum | TrainingBlockScalarFieldEnum[]
  }

  /**
   * TrainingBlock findMany
   */
  export type TrainingBlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * Filter, which TrainingBlocks to fetch.
     */
    where?: TrainingBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingBlocks to fetch.
     */
    orderBy?: TrainingBlockOrderByWithRelationInput | TrainingBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingBlocks.
     */
    cursor?: TrainingBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingBlocks.
     */
    skip?: number
    distinct?: TrainingBlockScalarFieldEnum | TrainingBlockScalarFieldEnum[]
  }

  /**
   * TrainingBlock create
   */
  export type TrainingBlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingBlock.
     */
    data: XOR<TrainingBlockCreateInput, TrainingBlockUncheckedCreateInput>
  }

  /**
   * TrainingBlock createMany
   */
  export type TrainingBlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingBlocks.
     */
    data: TrainingBlockCreateManyInput | TrainingBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingBlock createManyAndReturn
   */
  export type TrainingBlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingBlocks.
     */
    data: TrainingBlockCreateManyInput | TrainingBlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingBlock update
   */
  export type TrainingBlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingBlock.
     */
    data: XOR<TrainingBlockUpdateInput, TrainingBlockUncheckedUpdateInput>
    /**
     * Choose, which TrainingBlock to update.
     */
    where: TrainingBlockWhereUniqueInput
  }

  /**
   * TrainingBlock updateMany
   */
  export type TrainingBlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingBlocks.
     */
    data: XOR<TrainingBlockUpdateManyMutationInput, TrainingBlockUncheckedUpdateManyInput>
    /**
     * Filter which TrainingBlocks to update
     */
    where?: TrainingBlockWhereInput
    /**
     * Limit how many TrainingBlocks to update.
     */
    limit?: number
  }

  /**
   * TrainingBlock updateManyAndReturn
   */
  export type TrainingBlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * The data used to update TrainingBlocks.
     */
    data: XOR<TrainingBlockUpdateManyMutationInput, TrainingBlockUncheckedUpdateManyInput>
    /**
     * Filter which TrainingBlocks to update
     */
    where?: TrainingBlockWhereInput
    /**
     * Limit how many TrainingBlocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingBlock upsert
   */
  export type TrainingBlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingBlock to update in case it exists.
     */
    where: TrainingBlockWhereUniqueInput
    /**
     * In case the TrainingBlock found by the `where` argument doesn't exist, create a new TrainingBlock with this data.
     */
    create: XOR<TrainingBlockCreateInput, TrainingBlockUncheckedCreateInput>
    /**
     * In case the TrainingBlock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingBlockUpdateInput, TrainingBlockUncheckedUpdateInput>
  }

  /**
   * TrainingBlock delete
   */
  export type TrainingBlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    /**
     * Filter which TrainingBlock to delete.
     */
    where: TrainingBlockWhereUniqueInput
  }

  /**
   * TrainingBlock deleteMany
   */
  export type TrainingBlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingBlocks to delete
     */
    where?: TrainingBlockWhereInput
    /**
     * Limit how many TrainingBlocks to delete.
     */
    limit?: number
  }

  /**
   * TrainingBlock.weeks
   */
  export type TrainingBlock$weeksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    where?: TrainingWeekWhereInput
    orderBy?: TrainingWeekOrderByWithRelationInput | TrainingWeekOrderByWithRelationInput[]
    cursor?: TrainingWeekWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingWeekScalarFieldEnum | TrainingWeekScalarFieldEnum[]
  }

  /**
   * TrainingBlock without action
   */
  export type TrainingBlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
  }


  /**
   * Model TrainingWeek
   */

  export type AggregateTrainingWeek = {
    _count: TrainingWeekCountAggregateOutputType | null
    _avg: TrainingWeekAvgAggregateOutputType | null
    _sum: TrainingWeekSumAggregateOutputType | null
    _min: TrainingWeekMinAggregateOutputType | null
    _max: TrainingWeekMaxAggregateOutputType | null
  }

  export type TrainingWeekAvgAggregateOutputType = {
    weekNumber: number | null
  }

  export type TrainingWeekSumAggregateOutputType = {
    weekNumber: number | null
  }

  export type TrainingWeekMinAggregateOutputType = {
    id: string | null
    blockId: string | null
    weekNumber: number | null
    weekStart: Date | null
    weekEnd: Date | null
  }

  export type TrainingWeekMaxAggregateOutputType = {
    id: string | null
    blockId: string | null
    weekNumber: number | null
    weekStart: Date | null
    weekEnd: Date | null
  }

  export type TrainingWeekCountAggregateOutputType = {
    id: number
    blockId: number
    weekNumber: number
    weekStart: number
    weekEnd: number
    _all: number
  }


  export type TrainingWeekAvgAggregateInputType = {
    weekNumber?: true
  }

  export type TrainingWeekSumAggregateInputType = {
    weekNumber?: true
  }

  export type TrainingWeekMinAggregateInputType = {
    id?: true
    blockId?: true
    weekNumber?: true
    weekStart?: true
    weekEnd?: true
  }

  export type TrainingWeekMaxAggregateInputType = {
    id?: true
    blockId?: true
    weekNumber?: true
    weekStart?: true
    weekEnd?: true
  }

  export type TrainingWeekCountAggregateInputType = {
    id?: true
    blockId?: true
    weekNumber?: true
    weekStart?: true
    weekEnd?: true
    _all?: true
  }

  export type TrainingWeekAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingWeek to aggregate.
     */
    where?: TrainingWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingWeeks to fetch.
     */
    orderBy?: TrainingWeekOrderByWithRelationInput | TrainingWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingWeeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingWeeks
    **/
    _count?: true | TrainingWeekCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingWeekAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingWeekSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingWeekMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingWeekMaxAggregateInputType
  }

  export type GetTrainingWeekAggregateType<T extends TrainingWeekAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingWeek]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingWeek[P]>
      : GetScalarType<T[P], AggregateTrainingWeek[P]>
  }




  export type TrainingWeekGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingWeekWhereInput
    orderBy?: TrainingWeekOrderByWithAggregationInput | TrainingWeekOrderByWithAggregationInput[]
    by: TrainingWeekScalarFieldEnum[] | TrainingWeekScalarFieldEnum
    having?: TrainingWeekScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingWeekCountAggregateInputType | true
    _avg?: TrainingWeekAvgAggregateInputType
    _sum?: TrainingWeekSumAggregateInputType
    _min?: TrainingWeekMinAggregateInputType
    _max?: TrainingWeekMaxAggregateInputType
  }

  export type TrainingWeekGroupByOutputType = {
    id: string
    blockId: string
    weekNumber: number
    weekStart: Date
    weekEnd: Date
    _count: TrainingWeekCountAggregateOutputType | null
    _avg: TrainingWeekAvgAggregateOutputType | null
    _sum: TrainingWeekSumAggregateOutputType | null
    _min: TrainingWeekMinAggregateOutputType | null
    _max: TrainingWeekMaxAggregateOutputType | null
  }

  type GetTrainingWeekGroupByPayload<T extends TrainingWeekGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingWeekGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingWeekGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingWeekGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingWeekGroupByOutputType[P]>
        }
      >
    >


  export type TrainingWeekSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockId?: boolean
    weekNumber?: boolean
    weekStart?: boolean
    weekEnd?: boolean
    block?: boolean | TrainingBlockDefaultArgs<ExtArgs>
    trainingDays?: boolean | TrainingWeek$trainingDaysArgs<ExtArgs>
    dayExerciseSeries?: boolean | TrainingWeek$dayExerciseSeriesArgs<ExtArgs>
    _count?: boolean | TrainingWeekCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingWeek"]>

  export type TrainingWeekSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockId?: boolean
    weekNumber?: boolean
    weekStart?: boolean
    weekEnd?: boolean
    block?: boolean | TrainingBlockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingWeek"]>

  export type TrainingWeekSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockId?: boolean
    weekNumber?: boolean
    weekStart?: boolean
    weekEnd?: boolean
    block?: boolean | TrainingBlockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingWeek"]>

  export type TrainingWeekSelectScalar = {
    id?: boolean
    blockId?: boolean
    weekNumber?: boolean
    weekStart?: boolean
    weekEnd?: boolean
  }

  export type TrainingWeekOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "blockId" | "weekNumber" | "weekStart" | "weekEnd", ExtArgs["result"]["trainingWeek"]>
  export type TrainingWeekInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    block?: boolean | TrainingBlockDefaultArgs<ExtArgs>
    trainingDays?: boolean | TrainingWeek$trainingDaysArgs<ExtArgs>
    dayExerciseSeries?: boolean | TrainingWeek$dayExerciseSeriesArgs<ExtArgs>
    _count?: boolean | TrainingWeekCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingWeekIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    block?: boolean | TrainingBlockDefaultArgs<ExtArgs>
  }
  export type TrainingWeekIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    block?: boolean | TrainingBlockDefaultArgs<ExtArgs>
  }

  export type $TrainingWeekPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingWeek"
    objects: {
      block: Prisma.$TrainingBlockPayload<ExtArgs>
      trainingDays: Prisma.$TrainingDayPayload<ExtArgs>[]
      dayExerciseSeries: Prisma.$DayExerciseSeriesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      blockId: string
      weekNumber: number
      weekStart: Date
      weekEnd: Date
    }, ExtArgs["result"]["trainingWeek"]>
    composites: {}
  }

  type TrainingWeekGetPayload<S extends boolean | null | undefined | TrainingWeekDefaultArgs> = $Result.GetResult<Prisma.$TrainingWeekPayload, S>

  type TrainingWeekCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingWeekFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingWeekCountAggregateInputType | true
    }

  export interface TrainingWeekDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingWeek'], meta: { name: 'TrainingWeek' } }
    /**
     * Find zero or one TrainingWeek that matches the filter.
     * @param {TrainingWeekFindUniqueArgs} args - Arguments to find a TrainingWeek
     * @example
     * // Get one TrainingWeek
     * const trainingWeek = await prisma.trainingWeek.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingWeekFindUniqueArgs>(args: SelectSubset<T, TrainingWeekFindUniqueArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingWeek that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingWeekFindUniqueOrThrowArgs} args - Arguments to find a TrainingWeek
     * @example
     * // Get one TrainingWeek
     * const trainingWeek = await prisma.trainingWeek.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingWeekFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingWeekFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingWeek that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingWeekFindFirstArgs} args - Arguments to find a TrainingWeek
     * @example
     * // Get one TrainingWeek
     * const trainingWeek = await prisma.trainingWeek.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingWeekFindFirstArgs>(args?: SelectSubset<T, TrainingWeekFindFirstArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingWeek that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingWeekFindFirstOrThrowArgs} args - Arguments to find a TrainingWeek
     * @example
     * // Get one TrainingWeek
     * const trainingWeek = await prisma.trainingWeek.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingWeekFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingWeekFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingWeeks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingWeekFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingWeeks
     * const trainingWeeks = await prisma.trainingWeek.findMany()
     * 
     * // Get first 10 TrainingWeeks
     * const trainingWeeks = await prisma.trainingWeek.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingWeekWithIdOnly = await prisma.trainingWeek.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingWeekFindManyArgs>(args?: SelectSubset<T, TrainingWeekFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingWeek.
     * @param {TrainingWeekCreateArgs} args - Arguments to create a TrainingWeek.
     * @example
     * // Create one TrainingWeek
     * const TrainingWeek = await prisma.trainingWeek.create({
     *   data: {
     *     // ... data to create a TrainingWeek
     *   }
     * })
     * 
     */
    create<T extends TrainingWeekCreateArgs>(args: SelectSubset<T, TrainingWeekCreateArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingWeeks.
     * @param {TrainingWeekCreateManyArgs} args - Arguments to create many TrainingWeeks.
     * @example
     * // Create many TrainingWeeks
     * const trainingWeek = await prisma.trainingWeek.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingWeekCreateManyArgs>(args?: SelectSubset<T, TrainingWeekCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingWeeks and returns the data saved in the database.
     * @param {TrainingWeekCreateManyAndReturnArgs} args - Arguments to create many TrainingWeeks.
     * @example
     * // Create many TrainingWeeks
     * const trainingWeek = await prisma.trainingWeek.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingWeeks and only return the `id`
     * const trainingWeekWithIdOnly = await prisma.trainingWeek.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingWeekCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingWeekCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingWeek.
     * @param {TrainingWeekDeleteArgs} args - Arguments to delete one TrainingWeek.
     * @example
     * // Delete one TrainingWeek
     * const TrainingWeek = await prisma.trainingWeek.delete({
     *   where: {
     *     // ... filter to delete one TrainingWeek
     *   }
     * })
     * 
     */
    delete<T extends TrainingWeekDeleteArgs>(args: SelectSubset<T, TrainingWeekDeleteArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingWeek.
     * @param {TrainingWeekUpdateArgs} args - Arguments to update one TrainingWeek.
     * @example
     * // Update one TrainingWeek
     * const trainingWeek = await prisma.trainingWeek.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingWeekUpdateArgs>(args: SelectSubset<T, TrainingWeekUpdateArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingWeeks.
     * @param {TrainingWeekDeleteManyArgs} args - Arguments to filter TrainingWeeks to delete.
     * @example
     * // Delete a few TrainingWeeks
     * const { count } = await prisma.trainingWeek.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingWeekDeleteManyArgs>(args?: SelectSubset<T, TrainingWeekDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingWeeks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingWeekUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingWeeks
     * const trainingWeek = await prisma.trainingWeek.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingWeekUpdateManyArgs>(args: SelectSubset<T, TrainingWeekUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingWeeks and returns the data updated in the database.
     * @param {TrainingWeekUpdateManyAndReturnArgs} args - Arguments to update many TrainingWeeks.
     * @example
     * // Update many TrainingWeeks
     * const trainingWeek = await prisma.trainingWeek.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingWeeks and only return the `id`
     * const trainingWeekWithIdOnly = await prisma.trainingWeek.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingWeekUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingWeekUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingWeek.
     * @param {TrainingWeekUpsertArgs} args - Arguments to update or create a TrainingWeek.
     * @example
     * // Update or create a TrainingWeek
     * const trainingWeek = await prisma.trainingWeek.upsert({
     *   create: {
     *     // ... data to create a TrainingWeek
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingWeek we want to update
     *   }
     * })
     */
    upsert<T extends TrainingWeekUpsertArgs>(args: SelectSubset<T, TrainingWeekUpsertArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingWeeks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingWeekCountArgs} args - Arguments to filter TrainingWeeks to count.
     * @example
     * // Count the number of TrainingWeeks
     * const count = await prisma.trainingWeek.count({
     *   where: {
     *     // ... the filter for the TrainingWeeks we want to count
     *   }
     * })
    **/
    count<T extends TrainingWeekCountArgs>(
      args?: Subset<T, TrainingWeekCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingWeekCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingWeek.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingWeekAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingWeekAggregateArgs>(args: Subset<T, TrainingWeekAggregateArgs>): Prisma.PrismaPromise<GetTrainingWeekAggregateType<T>>

    /**
     * Group by TrainingWeek.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingWeekGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingWeekGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingWeekGroupByArgs['orderBy'] }
        : { orderBy?: TrainingWeekGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingWeekGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingWeekGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingWeek model
   */
  readonly fields: TrainingWeekFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingWeek.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingWeekClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    block<T extends TrainingBlockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingBlockDefaultArgs<ExtArgs>>): Prisma__TrainingBlockClient<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainingDays<T extends TrainingWeek$trainingDaysArgs<ExtArgs> = {}>(args?: Subset<T, TrainingWeek$trainingDaysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dayExerciseSeries<T extends TrainingWeek$dayExerciseSeriesArgs<ExtArgs> = {}>(args?: Subset<T, TrainingWeek$dayExerciseSeriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingWeek model
   */
  interface TrainingWeekFieldRefs {
    readonly id: FieldRef<"TrainingWeek", 'String'>
    readonly blockId: FieldRef<"TrainingWeek", 'String'>
    readonly weekNumber: FieldRef<"TrainingWeek", 'Int'>
    readonly weekStart: FieldRef<"TrainingWeek", 'DateTime'>
    readonly weekEnd: FieldRef<"TrainingWeek", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingWeek findUnique
   */
  export type TrainingWeekFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * Filter, which TrainingWeek to fetch.
     */
    where: TrainingWeekWhereUniqueInput
  }

  /**
   * TrainingWeek findUniqueOrThrow
   */
  export type TrainingWeekFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * Filter, which TrainingWeek to fetch.
     */
    where: TrainingWeekWhereUniqueInput
  }

  /**
   * TrainingWeek findFirst
   */
  export type TrainingWeekFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * Filter, which TrainingWeek to fetch.
     */
    where?: TrainingWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingWeeks to fetch.
     */
    orderBy?: TrainingWeekOrderByWithRelationInput | TrainingWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingWeeks.
     */
    cursor?: TrainingWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingWeeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingWeeks.
     */
    distinct?: TrainingWeekScalarFieldEnum | TrainingWeekScalarFieldEnum[]
  }

  /**
   * TrainingWeek findFirstOrThrow
   */
  export type TrainingWeekFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * Filter, which TrainingWeek to fetch.
     */
    where?: TrainingWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingWeeks to fetch.
     */
    orderBy?: TrainingWeekOrderByWithRelationInput | TrainingWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingWeeks.
     */
    cursor?: TrainingWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingWeeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingWeeks.
     */
    distinct?: TrainingWeekScalarFieldEnum | TrainingWeekScalarFieldEnum[]
  }

  /**
   * TrainingWeek findMany
   */
  export type TrainingWeekFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * Filter, which TrainingWeeks to fetch.
     */
    where?: TrainingWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingWeeks to fetch.
     */
    orderBy?: TrainingWeekOrderByWithRelationInput | TrainingWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingWeeks.
     */
    cursor?: TrainingWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingWeeks.
     */
    skip?: number
    distinct?: TrainingWeekScalarFieldEnum | TrainingWeekScalarFieldEnum[]
  }

  /**
   * TrainingWeek create
   */
  export type TrainingWeekCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingWeek.
     */
    data: XOR<TrainingWeekCreateInput, TrainingWeekUncheckedCreateInput>
  }

  /**
   * TrainingWeek createMany
   */
  export type TrainingWeekCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingWeeks.
     */
    data: TrainingWeekCreateManyInput | TrainingWeekCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingWeek createManyAndReturn
   */
  export type TrainingWeekCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingWeeks.
     */
    data: TrainingWeekCreateManyInput | TrainingWeekCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingWeek update
   */
  export type TrainingWeekUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingWeek.
     */
    data: XOR<TrainingWeekUpdateInput, TrainingWeekUncheckedUpdateInput>
    /**
     * Choose, which TrainingWeek to update.
     */
    where: TrainingWeekWhereUniqueInput
  }

  /**
   * TrainingWeek updateMany
   */
  export type TrainingWeekUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingWeeks.
     */
    data: XOR<TrainingWeekUpdateManyMutationInput, TrainingWeekUncheckedUpdateManyInput>
    /**
     * Filter which TrainingWeeks to update
     */
    where?: TrainingWeekWhereInput
    /**
     * Limit how many TrainingWeeks to update.
     */
    limit?: number
  }

  /**
   * TrainingWeek updateManyAndReturn
   */
  export type TrainingWeekUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * The data used to update TrainingWeeks.
     */
    data: XOR<TrainingWeekUpdateManyMutationInput, TrainingWeekUncheckedUpdateManyInput>
    /**
     * Filter which TrainingWeeks to update
     */
    where?: TrainingWeekWhereInput
    /**
     * Limit how many TrainingWeeks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingWeek upsert
   */
  export type TrainingWeekUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingWeek to update in case it exists.
     */
    where: TrainingWeekWhereUniqueInput
    /**
     * In case the TrainingWeek found by the `where` argument doesn't exist, create a new TrainingWeek with this data.
     */
    create: XOR<TrainingWeekCreateInput, TrainingWeekUncheckedCreateInput>
    /**
     * In case the TrainingWeek was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingWeekUpdateInput, TrainingWeekUncheckedUpdateInput>
  }

  /**
   * TrainingWeek delete
   */
  export type TrainingWeekDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
    /**
     * Filter which TrainingWeek to delete.
     */
    where: TrainingWeekWhereUniqueInput
  }

  /**
   * TrainingWeek deleteMany
   */
  export type TrainingWeekDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingWeeks to delete
     */
    where?: TrainingWeekWhereInput
    /**
     * Limit how many TrainingWeeks to delete.
     */
    limit?: number
  }

  /**
   * TrainingWeek.trainingDays
   */
  export type TrainingWeek$trainingDaysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    where?: TrainingDayWhereInput
    orderBy?: TrainingDayOrderByWithRelationInput | TrainingDayOrderByWithRelationInput[]
    cursor?: TrainingDayWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingDayScalarFieldEnum | TrainingDayScalarFieldEnum[]
  }

  /**
   * TrainingWeek.dayExerciseSeries
   */
  export type TrainingWeek$dayExerciseSeriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    where?: DayExerciseSeriesWhereInput
    orderBy?: DayExerciseSeriesOrderByWithRelationInput | DayExerciseSeriesOrderByWithRelationInput[]
    cursor?: DayExerciseSeriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DayExerciseSeriesScalarFieldEnum | DayExerciseSeriesScalarFieldEnum[]
  }

  /**
   * TrainingWeek without action
   */
  export type TrainingWeekDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingWeek
     */
    select?: TrainingWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingWeek
     */
    omit?: TrainingWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingWeekInclude<ExtArgs> | null
  }


  /**
   * Model TrainingDay
   */

  export type AggregateTrainingDay = {
    _count: TrainingDayCountAggregateOutputType | null
    _avg: TrainingDayAvgAggregateOutputType | null
    _sum: TrainingDaySumAggregateOutputType | null
    _min: TrainingDayMinAggregateOutputType | null
    _max: TrainingDayMaxAggregateOutputType | null
  }

  export type TrainingDayAvgAggregateOutputType = {
    dayNumber: number | null
  }

  export type TrainingDaySumAggregateOutputType = {
    dayNumber: number | null
  }

  export type TrainingDayMinAggregateOutputType = {
    id: string | null
    date: Date | null
    dayLabel: string | null
    dayNumber: number | null
    weekId: string | null
  }

  export type TrainingDayMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    dayLabel: string | null
    dayNumber: number | null
    weekId: string | null
  }

  export type TrainingDayCountAggregateOutputType = {
    id: number
    date: number
    dayLabel: number
    dayNumber: number
    weekId: number
    _all: number
  }


  export type TrainingDayAvgAggregateInputType = {
    dayNumber?: true
  }

  export type TrainingDaySumAggregateInputType = {
    dayNumber?: true
  }

  export type TrainingDayMinAggregateInputType = {
    id?: true
    date?: true
    dayLabel?: true
    dayNumber?: true
    weekId?: true
  }

  export type TrainingDayMaxAggregateInputType = {
    id?: true
    date?: true
    dayLabel?: true
    dayNumber?: true
    weekId?: true
  }

  export type TrainingDayCountAggregateInputType = {
    id?: true
    date?: true
    dayLabel?: true
    dayNumber?: true
    weekId?: true
    _all?: true
  }

  export type TrainingDayAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingDay to aggregate.
     */
    where?: TrainingDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingDays to fetch.
     */
    orderBy?: TrainingDayOrderByWithRelationInput | TrainingDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingDays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingDays
    **/
    _count?: true | TrainingDayCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingDayAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingDaySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingDayMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingDayMaxAggregateInputType
  }

  export type GetTrainingDayAggregateType<T extends TrainingDayAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingDay]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingDay[P]>
      : GetScalarType<T[P], AggregateTrainingDay[P]>
  }




  export type TrainingDayGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingDayWhereInput
    orderBy?: TrainingDayOrderByWithAggregationInput | TrainingDayOrderByWithAggregationInput[]
    by: TrainingDayScalarFieldEnum[] | TrainingDayScalarFieldEnum
    having?: TrainingDayScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingDayCountAggregateInputType | true
    _avg?: TrainingDayAvgAggregateInputType
    _sum?: TrainingDaySumAggregateInputType
    _min?: TrainingDayMinAggregateInputType
    _max?: TrainingDayMaxAggregateInputType
  }

  export type TrainingDayGroupByOutputType = {
    id: string
    date: Date
    dayLabel: string
    dayNumber: number
    weekId: string
    _count: TrainingDayCountAggregateOutputType | null
    _avg: TrainingDayAvgAggregateOutputType | null
    _sum: TrainingDaySumAggregateOutputType | null
    _min: TrainingDayMinAggregateOutputType | null
    _max: TrainingDayMaxAggregateOutputType | null
  }

  type GetTrainingDayGroupByPayload<T extends TrainingDayGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingDayGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingDayGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingDayGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingDayGroupByOutputType[P]>
        }
      >
    >


  export type TrainingDaySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    dayLabel?: boolean
    dayNumber?: boolean
    weekId?: boolean
    week?: boolean | TrainingWeekDefaultArgs<ExtArgs>
    dayExercises?: boolean | TrainingDay$dayExercisesArgs<ExtArgs>
    _count?: boolean | TrainingDayCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingDay"]>

  export type TrainingDaySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    dayLabel?: boolean
    dayNumber?: boolean
    weekId?: boolean
    week?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingDay"]>

  export type TrainingDaySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    dayLabel?: boolean
    dayNumber?: boolean
    weekId?: boolean
    week?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingDay"]>

  export type TrainingDaySelectScalar = {
    id?: boolean
    date?: boolean
    dayLabel?: boolean
    dayNumber?: boolean
    weekId?: boolean
  }

  export type TrainingDayOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "dayLabel" | "dayNumber" | "weekId", ExtArgs["result"]["trainingDay"]>
  export type TrainingDayInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    week?: boolean | TrainingWeekDefaultArgs<ExtArgs>
    dayExercises?: boolean | TrainingDay$dayExercisesArgs<ExtArgs>
    _count?: boolean | TrainingDayCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingDayIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    week?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }
  export type TrainingDayIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    week?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }

  export type $TrainingDayPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingDay"
    objects: {
      week: Prisma.$TrainingWeekPayload<ExtArgs>
      dayExercises: Prisma.$DayExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      dayLabel: string
      dayNumber: number
      weekId: string
    }, ExtArgs["result"]["trainingDay"]>
    composites: {}
  }

  type TrainingDayGetPayload<S extends boolean | null | undefined | TrainingDayDefaultArgs> = $Result.GetResult<Prisma.$TrainingDayPayload, S>

  type TrainingDayCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingDayFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingDayCountAggregateInputType | true
    }

  export interface TrainingDayDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingDay'], meta: { name: 'TrainingDay' } }
    /**
     * Find zero or one TrainingDay that matches the filter.
     * @param {TrainingDayFindUniqueArgs} args - Arguments to find a TrainingDay
     * @example
     * // Get one TrainingDay
     * const trainingDay = await prisma.trainingDay.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingDayFindUniqueArgs>(args: SelectSubset<T, TrainingDayFindUniqueArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingDay that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingDayFindUniqueOrThrowArgs} args - Arguments to find a TrainingDay
     * @example
     * // Get one TrainingDay
     * const trainingDay = await prisma.trainingDay.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingDayFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingDayFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingDay that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingDayFindFirstArgs} args - Arguments to find a TrainingDay
     * @example
     * // Get one TrainingDay
     * const trainingDay = await prisma.trainingDay.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingDayFindFirstArgs>(args?: SelectSubset<T, TrainingDayFindFirstArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingDay that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingDayFindFirstOrThrowArgs} args - Arguments to find a TrainingDay
     * @example
     * // Get one TrainingDay
     * const trainingDay = await prisma.trainingDay.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingDayFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingDayFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingDays that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingDayFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingDays
     * const trainingDays = await prisma.trainingDay.findMany()
     * 
     * // Get first 10 TrainingDays
     * const trainingDays = await prisma.trainingDay.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingDayWithIdOnly = await prisma.trainingDay.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingDayFindManyArgs>(args?: SelectSubset<T, TrainingDayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingDay.
     * @param {TrainingDayCreateArgs} args - Arguments to create a TrainingDay.
     * @example
     * // Create one TrainingDay
     * const TrainingDay = await prisma.trainingDay.create({
     *   data: {
     *     // ... data to create a TrainingDay
     *   }
     * })
     * 
     */
    create<T extends TrainingDayCreateArgs>(args: SelectSubset<T, TrainingDayCreateArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingDays.
     * @param {TrainingDayCreateManyArgs} args - Arguments to create many TrainingDays.
     * @example
     * // Create many TrainingDays
     * const trainingDay = await prisma.trainingDay.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingDayCreateManyArgs>(args?: SelectSubset<T, TrainingDayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingDays and returns the data saved in the database.
     * @param {TrainingDayCreateManyAndReturnArgs} args - Arguments to create many TrainingDays.
     * @example
     * // Create many TrainingDays
     * const trainingDay = await prisma.trainingDay.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingDays and only return the `id`
     * const trainingDayWithIdOnly = await prisma.trainingDay.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingDayCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingDayCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingDay.
     * @param {TrainingDayDeleteArgs} args - Arguments to delete one TrainingDay.
     * @example
     * // Delete one TrainingDay
     * const TrainingDay = await prisma.trainingDay.delete({
     *   where: {
     *     // ... filter to delete one TrainingDay
     *   }
     * })
     * 
     */
    delete<T extends TrainingDayDeleteArgs>(args: SelectSubset<T, TrainingDayDeleteArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingDay.
     * @param {TrainingDayUpdateArgs} args - Arguments to update one TrainingDay.
     * @example
     * // Update one TrainingDay
     * const trainingDay = await prisma.trainingDay.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingDayUpdateArgs>(args: SelectSubset<T, TrainingDayUpdateArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingDays.
     * @param {TrainingDayDeleteManyArgs} args - Arguments to filter TrainingDays to delete.
     * @example
     * // Delete a few TrainingDays
     * const { count } = await prisma.trainingDay.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingDayDeleteManyArgs>(args?: SelectSubset<T, TrainingDayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingDays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingDayUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingDays
     * const trainingDay = await prisma.trainingDay.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingDayUpdateManyArgs>(args: SelectSubset<T, TrainingDayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingDays and returns the data updated in the database.
     * @param {TrainingDayUpdateManyAndReturnArgs} args - Arguments to update many TrainingDays.
     * @example
     * // Update many TrainingDays
     * const trainingDay = await prisma.trainingDay.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingDays and only return the `id`
     * const trainingDayWithIdOnly = await prisma.trainingDay.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingDayUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingDayUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingDay.
     * @param {TrainingDayUpsertArgs} args - Arguments to update or create a TrainingDay.
     * @example
     * // Update or create a TrainingDay
     * const trainingDay = await prisma.trainingDay.upsert({
     *   create: {
     *     // ... data to create a TrainingDay
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingDay we want to update
     *   }
     * })
     */
    upsert<T extends TrainingDayUpsertArgs>(args: SelectSubset<T, TrainingDayUpsertArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingDays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingDayCountArgs} args - Arguments to filter TrainingDays to count.
     * @example
     * // Count the number of TrainingDays
     * const count = await prisma.trainingDay.count({
     *   where: {
     *     // ... the filter for the TrainingDays we want to count
     *   }
     * })
    **/
    count<T extends TrainingDayCountArgs>(
      args?: Subset<T, TrainingDayCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingDayCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingDay.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingDayAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingDayAggregateArgs>(args: Subset<T, TrainingDayAggregateArgs>): Prisma.PrismaPromise<GetTrainingDayAggregateType<T>>

    /**
     * Group by TrainingDay.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingDayGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingDayGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingDayGroupByArgs['orderBy'] }
        : { orderBy?: TrainingDayGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingDayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingDayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingDay model
   */
  readonly fields: TrainingDayFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingDay.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingDayClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    week<T extends TrainingWeekDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingWeekDefaultArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dayExercises<T extends TrainingDay$dayExercisesArgs<ExtArgs> = {}>(args?: Subset<T, TrainingDay$dayExercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingDay model
   */
  interface TrainingDayFieldRefs {
    readonly id: FieldRef<"TrainingDay", 'String'>
    readonly date: FieldRef<"TrainingDay", 'DateTime'>
    readonly dayLabel: FieldRef<"TrainingDay", 'String'>
    readonly dayNumber: FieldRef<"TrainingDay", 'Int'>
    readonly weekId: FieldRef<"TrainingDay", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TrainingDay findUnique
   */
  export type TrainingDayFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * Filter, which TrainingDay to fetch.
     */
    where: TrainingDayWhereUniqueInput
  }

  /**
   * TrainingDay findUniqueOrThrow
   */
  export type TrainingDayFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * Filter, which TrainingDay to fetch.
     */
    where: TrainingDayWhereUniqueInput
  }

  /**
   * TrainingDay findFirst
   */
  export type TrainingDayFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * Filter, which TrainingDay to fetch.
     */
    where?: TrainingDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingDays to fetch.
     */
    orderBy?: TrainingDayOrderByWithRelationInput | TrainingDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingDays.
     */
    cursor?: TrainingDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingDays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingDays.
     */
    distinct?: TrainingDayScalarFieldEnum | TrainingDayScalarFieldEnum[]
  }

  /**
   * TrainingDay findFirstOrThrow
   */
  export type TrainingDayFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * Filter, which TrainingDay to fetch.
     */
    where?: TrainingDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingDays to fetch.
     */
    orderBy?: TrainingDayOrderByWithRelationInput | TrainingDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingDays.
     */
    cursor?: TrainingDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingDays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingDays.
     */
    distinct?: TrainingDayScalarFieldEnum | TrainingDayScalarFieldEnum[]
  }

  /**
   * TrainingDay findMany
   */
  export type TrainingDayFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * Filter, which TrainingDays to fetch.
     */
    where?: TrainingDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingDays to fetch.
     */
    orderBy?: TrainingDayOrderByWithRelationInput | TrainingDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingDays.
     */
    cursor?: TrainingDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingDays.
     */
    skip?: number
    distinct?: TrainingDayScalarFieldEnum | TrainingDayScalarFieldEnum[]
  }

  /**
   * TrainingDay create
   */
  export type TrainingDayCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingDay.
     */
    data: XOR<TrainingDayCreateInput, TrainingDayUncheckedCreateInput>
  }

  /**
   * TrainingDay createMany
   */
  export type TrainingDayCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingDays.
     */
    data: TrainingDayCreateManyInput | TrainingDayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingDay createManyAndReturn
   */
  export type TrainingDayCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingDays.
     */
    data: TrainingDayCreateManyInput | TrainingDayCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingDay update
   */
  export type TrainingDayUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingDay.
     */
    data: XOR<TrainingDayUpdateInput, TrainingDayUncheckedUpdateInput>
    /**
     * Choose, which TrainingDay to update.
     */
    where: TrainingDayWhereUniqueInput
  }

  /**
   * TrainingDay updateMany
   */
  export type TrainingDayUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingDays.
     */
    data: XOR<TrainingDayUpdateManyMutationInput, TrainingDayUncheckedUpdateManyInput>
    /**
     * Filter which TrainingDays to update
     */
    where?: TrainingDayWhereInput
    /**
     * Limit how many TrainingDays to update.
     */
    limit?: number
  }

  /**
   * TrainingDay updateManyAndReturn
   */
  export type TrainingDayUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * The data used to update TrainingDays.
     */
    data: XOR<TrainingDayUpdateManyMutationInput, TrainingDayUncheckedUpdateManyInput>
    /**
     * Filter which TrainingDays to update
     */
    where?: TrainingDayWhereInput
    /**
     * Limit how many TrainingDays to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingDay upsert
   */
  export type TrainingDayUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingDay to update in case it exists.
     */
    where: TrainingDayWhereUniqueInput
    /**
     * In case the TrainingDay found by the `where` argument doesn't exist, create a new TrainingDay with this data.
     */
    create: XOR<TrainingDayCreateInput, TrainingDayUncheckedCreateInput>
    /**
     * In case the TrainingDay was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingDayUpdateInput, TrainingDayUncheckedUpdateInput>
  }

  /**
   * TrainingDay delete
   */
  export type TrainingDayDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
    /**
     * Filter which TrainingDay to delete.
     */
    where: TrainingDayWhereUniqueInput
  }

  /**
   * TrainingDay deleteMany
   */
  export type TrainingDayDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingDays to delete
     */
    where?: TrainingDayWhereInput
    /**
     * Limit how many TrainingDays to delete.
     */
    limit?: number
  }

  /**
   * TrainingDay.dayExercises
   */
  export type TrainingDay$dayExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    where?: DayExerciseWhereInput
    orderBy?: DayExerciseOrderByWithRelationInput | DayExerciseOrderByWithRelationInput[]
    cursor?: DayExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DayExerciseScalarFieldEnum | DayExerciseScalarFieldEnum[]
  }

  /**
   * TrainingDay without action
   */
  export type TrainingDayDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingDay
     */
    select?: TrainingDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingDay
     */
    omit?: TrainingDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingDayInclude<ExtArgs> | null
  }


  /**
   * Model ExerciseGroup
   */

  export type AggregateExerciseGroup = {
    _count: ExerciseGroupCountAggregateOutputType | null
    _min: ExerciseGroupMinAggregateOutputType | null
    _max: ExerciseGroupMaxAggregateOutputType | null
  }

  export type ExerciseGroupMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type ExerciseGroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type ExerciseGroupCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type ExerciseGroupMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type ExerciseGroupMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type ExerciseGroupCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type ExerciseGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciseGroup to aggregate.
     */
    where?: ExerciseGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseGroups to fetch.
     */
    orderBy?: ExerciseGroupOrderByWithRelationInput | ExerciseGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExerciseGroups
    **/
    _count?: true | ExerciseGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseGroupMaxAggregateInputType
  }

  export type GetExerciseGroupAggregateType<T extends ExerciseGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateExerciseGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExerciseGroup[P]>
      : GetScalarType<T[P], AggregateExerciseGroup[P]>
  }




  export type ExerciseGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseGroupWhereInput
    orderBy?: ExerciseGroupOrderByWithAggregationInput | ExerciseGroupOrderByWithAggregationInput[]
    by: ExerciseGroupScalarFieldEnum[] | ExerciseGroupScalarFieldEnum
    having?: ExerciseGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseGroupCountAggregateInputType | true
    _min?: ExerciseGroupMinAggregateInputType
    _max?: ExerciseGroupMaxAggregateInputType
  }

  export type ExerciseGroupGroupByOutputType = {
    id: string
    name: string
    _count: ExerciseGroupCountAggregateOutputType | null
    _min: ExerciseGroupMinAggregateOutputType | null
    _max: ExerciseGroupMaxAggregateOutputType | null
  }

  type GetExerciseGroupGroupByPayload<T extends ExerciseGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    exercises?: boolean | ExerciseGroup$exercisesArgs<ExtArgs>
    _count?: boolean | ExerciseGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exerciseGroup"]>

  export type ExerciseGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["exerciseGroup"]>

  export type ExerciseGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["exerciseGroup"]>

  export type ExerciseGroupSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type ExerciseGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["exerciseGroup"]>
  export type ExerciseGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercises?: boolean | ExerciseGroup$exercisesArgs<ExtArgs>
    _count?: boolean | ExerciseGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExerciseGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ExerciseGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExerciseGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExerciseGroup"
    objects: {
      exercises: Prisma.$ExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["exerciseGroup"]>
    composites: {}
  }

  type ExerciseGroupGetPayload<S extends boolean | null | undefined | ExerciseGroupDefaultArgs> = $Result.GetResult<Prisma.$ExerciseGroupPayload, S>

  type ExerciseGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseGroupCountAggregateInputType | true
    }

  export interface ExerciseGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExerciseGroup'], meta: { name: 'ExerciseGroup' } }
    /**
     * Find zero or one ExerciseGroup that matches the filter.
     * @param {ExerciseGroupFindUniqueArgs} args - Arguments to find a ExerciseGroup
     * @example
     * // Get one ExerciseGroup
     * const exerciseGroup = await prisma.exerciseGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseGroupFindUniqueArgs>(args: SelectSubset<T, ExerciseGroupFindUniqueArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExerciseGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseGroupFindUniqueOrThrowArgs} args - Arguments to find a ExerciseGroup
     * @example
     * // Get one ExerciseGroup
     * const exerciseGroup = await prisma.exerciseGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciseGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupFindFirstArgs} args - Arguments to find a ExerciseGroup
     * @example
     * // Get one ExerciseGroup
     * const exerciseGroup = await prisma.exerciseGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseGroupFindFirstArgs>(args?: SelectSubset<T, ExerciseGroupFindFirstArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciseGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupFindFirstOrThrowArgs} args - Arguments to find a ExerciseGroup
     * @example
     * // Get one ExerciseGroup
     * const exerciseGroup = await prisma.exerciseGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExerciseGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExerciseGroups
     * const exerciseGroups = await prisma.exerciseGroup.findMany()
     * 
     * // Get first 10 ExerciseGroups
     * const exerciseGroups = await prisma.exerciseGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseGroupWithIdOnly = await prisma.exerciseGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseGroupFindManyArgs>(args?: SelectSubset<T, ExerciseGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExerciseGroup.
     * @param {ExerciseGroupCreateArgs} args - Arguments to create a ExerciseGroup.
     * @example
     * // Create one ExerciseGroup
     * const ExerciseGroup = await prisma.exerciseGroup.create({
     *   data: {
     *     // ... data to create a ExerciseGroup
     *   }
     * })
     * 
     */
    create<T extends ExerciseGroupCreateArgs>(args: SelectSubset<T, ExerciseGroupCreateArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExerciseGroups.
     * @param {ExerciseGroupCreateManyArgs} args - Arguments to create many ExerciseGroups.
     * @example
     * // Create many ExerciseGroups
     * const exerciseGroup = await prisma.exerciseGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseGroupCreateManyArgs>(args?: SelectSubset<T, ExerciseGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExerciseGroups and returns the data saved in the database.
     * @param {ExerciseGroupCreateManyAndReturnArgs} args - Arguments to create many ExerciseGroups.
     * @example
     * // Create many ExerciseGroups
     * const exerciseGroup = await prisma.exerciseGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExerciseGroups and only return the `id`
     * const exerciseGroupWithIdOnly = await prisma.exerciseGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExerciseGroup.
     * @param {ExerciseGroupDeleteArgs} args - Arguments to delete one ExerciseGroup.
     * @example
     * // Delete one ExerciseGroup
     * const ExerciseGroup = await prisma.exerciseGroup.delete({
     *   where: {
     *     // ... filter to delete one ExerciseGroup
     *   }
     * })
     * 
     */
    delete<T extends ExerciseGroupDeleteArgs>(args: SelectSubset<T, ExerciseGroupDeleteArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExerciseGroup.
     * @param {ExerciseGroupUpdateArgs} args - Arguments to update one ExerciseGroup.
     * @example
     * // Update one ExerciseGroup
     * const exerciseGroup = await prisma.exerciseGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseGroupUpdateArgs>(args: SelectSubset<T, ExerciseGroupUpdateArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExerciseGroups.
     * @param {ExerciseGroupDeleteManyArgs} args - Arguments to filter ExerciseGroups to delete.
     * @example
     * // Delete a few ExerciseGroups
     * const { count } = await prisma.exerciseGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseGroupDeleteManyArgs>(args?: SelectSubset<T, ExerciseGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExerciseGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExerciseGroups
     * const exerciseGroup = await prisma.exerciseGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseGroupUpdateManyArgs>(args: SelectSubset<T, ExerciseGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExerciseGroups and returns the data updated in the database.
     * @param {ExerciseGroupUpdateManyAndReturnArgs} args - Arguments to update many ExerciseGroups.
     * @example
     * // Update many ExerciseGroups
     * const exerciseGroup = await prisma.exerciseGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExerciseGroups and only return the `id`
     * const exerciseGroupWithIdOnly = await prisma.exerciseGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExerciseGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExerciseGroup.
     * @param {ExerciseGroupUpsertArgs} args - Arguments to update or create a ExerciseGroup.
     * @example
     * // Update or create a ExerciseGroup
     * const exerciseGroup = await prisma.exerciseGroup.upsert({
     *   create: {
     *     // ... data to create a ExerciseGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExerciseGroup we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseGroupUpsertArgs>(args: SelectSubset<T, ExerciseGroupUpsertArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExerciseGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupCountArgs} args - Arguments to filter ExerciseGroups to count.
     * @example
     * // Count the number of ExerciseGroups
     * const count = await prisma.exerciseGroup.count({
     *   where: {
     *     // ... the filter for the ExerciseGroups we want to count
     *   }
     * })
    **/
    count<T extends ExerciseGroupCountArgs>(
      args?: Subset<T, ExerciseGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExerciseGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExerciseGroupAggregateArgs>(args: Subset<T, ExerciseGroupAggregateArgs>): Prisma.PrismaPromise<GetExerciseGroupAggregateType<T>>

    /**
     * Group by ExerciseGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExerciseGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciseGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExerciseGroup model
   */
  readonly fields: ExerciseGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExerciseGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exercises<T extends ExerciseGroup$exercisesArgs<ExtArgs> = {}>(args?: Subset<T, ExerciseGroup$exercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExerciseGroup model
   */
  interface ExerciseGroupFieldRefs {
    readonly id: FieldRef<"ExerciseGroup", 'String'>
    readonly name: FieldRef<"ExerciseGroup", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExerciseGroup findUnique
   */
  export type ExerciseGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseGroup to fetch.
     */
    where: ExerciseGroupWhereUniqueInput
  }

  /**
   * ExerciseGroup findUniqueOrThrow
   */
  export type ExerciseGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseGroup to fetch.
     */
    where: ExerciseGroupWhereUniqueInput
  }

  /**
   * ExerciseGroup findFirst
   */
  export type ExerciseGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseGroup to fetch.
     */
    where?: ExerciseGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseGroups to fetch.
     */
    orderBy?: ExerciseGroupOrderByWithRelationInput | ExerciseGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciseGroups.
     */
    cursor?: ExerciseGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciseGroups.
     */
    distinct?: ExerciseGroupScalarFieldEnum | ExerciseGroupScalarFieldEnum[]
  }

  /**
   * ExerciseGroup findFirstOrThrow
   */
  export type ExerciseGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseGroup to fetch.
     */
    where?: ExerciseGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseGroups to fetch.
     */
    orderBy?: ExerciseGroupOrderByWithRelationInput | ExerciseGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciseGroups.
     */
    cursor?: ExerciseGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciseGroups.
     */
    distinct?: ExerciseGroupScalarFieldEnum | ExerciseGroupScalarFieldEnum[]
  }

  /**
   * ExerciseGroup findMany
   */
  export type ExerciseGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseGroups to fetch.
     */
    where?: ExerciseGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseGroups to fetch.
     */
    orderBy?: ExerciseGroupOrderByWithRelationInput | ExerciseGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExerciseGroups.
     */
    cursor?: ExerciseGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseGroups.
     */
    skip?: number
    distinct?: ExerciseGroupScalarFieldEnum | ExerciseGroupScalarFieldEnum[]
  }

  /**
   * ExerciseGroup create
   */
  export type ExerciseGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a ExerciseGroup.
     */
    data: XOR<ExerciseGroupCreateInput, ExerciseGroupUncheckedCreateInput>
  }

  /**
   * ExerciseGroup createMany
   */
  export type ExerciseGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExerciseGroups.
     */
    data: ExerciseGroupCreateManyInput | ExerciseGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExerciseGroup createManyAndReturn
   */
  export type ExerciseGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * The data used to create many ExerciseGroups.
     */
    data: ExerciseGroupCreateManyInput | ExerciseGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExerciseGroup update
   */
  export type ExerciseGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a ExerciseGroup.
     */
    data: XOR<ExerciseGroupUpdateInput, ExerciseGroupUncheckedUpdateInput>
    /**
     * Choose, which ExerciseGroup to update.
     */
    where: ExerciseGroupWhereUniqueInput
  }

  /**
   * ExerciseGroup updateMany
   */
  export type ExerciseGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExerciseGroups.
     */
    data: XOR<ExerciseGroupUpdateManyMutationInput, ExerciseGroupUncheckedUpdateManyInput>
    /**
     * Filter which ExerciseGroups to update
     */
    where?: ExerciseGroupWhereInput
    /**
     * Limit how many ExerciseGroups to update.
     */
    limit?: number
  }

  /**
   * ExerciseGroup updateManyAndReturn
   */
  export type ExerciseGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * The data used to update ExerciseGroups.
     */
    data: XOR<ExerciseGroupUpdateManyMutationInput, ExerciseGroupUncheckedUpdateManyInput>
    /**
     * Filter which ExerciseGroups to update
     */
    where?: ExerciseGroupWhereInput
    /**
     * Limit how many ExerciseGroups to update.
     */
    limit?: number
  }

  /**
   * ExerciseGroup upsert
   */
  export type ExerciseGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the ExerciseGroup to update in case it exists.
     */
    where: ExerciseGroupWhereUniqueInput
    /**
     * In case the ExerciseGroup found by the `where` argument doesn't exist, create a new ExerciseGroup with this data.
     */
    create: XOR<ExerciseGroupCreateInput, ExerciseGroupUncheckedCreateInput>
    /**
     * In case the ExerciseGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseGroupUpdateInput, ExerciseGroupUncheckedUpdateInput>
  }

  /**
   * ExerciseGroup delete
   */
  export type ExerciseGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
    /**
     * Filter which ExerciseGroup to delete.
     */
    where: ExerciseGroupWhereUniqueInput
  }

  /**
   * ExerciseGroup deleteMany
   */
  export type ExerciseGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciseGroups to delete
     */
    where?: ExerciseGroupWhereInput
    /**
     * Limit how many ExerciseGroups to delete.
     */
    limit?: number
  }

  /**
   * ExerciseGroup.exercises
   */
  export type ExerciseGroup$exercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    cursor?: ExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * ExerciseGroup without action
   */
  export type ExerciseGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseGroup
     */
    select?: ExerciseGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseGroup
     */
    omit?: ExerciseGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseGroupInclude<ExtArgs> | null
  }


  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  export type ExerciseAvgAggregateOutputType = {
    recommendedMinReps: number | null
    recommendedMaxReps: number | null
  }

  export type ExerciseSumAggregateOutputType = {
    recommendedMinReps: number | null
    recommendedMaxReps: number | null
  }

  export type ExerciseMinAggregateOutputType = {
    id: string | null
    name: string | null
    exerciseGroupId: string | null
    recommendedMinReps: number | null
    recommendedMaxReps: number | null
  }

  export type ExerciseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    exerciseGroupId: string | null
    recommendedMinReps: number | null
    recommendedMaxReps: number | null
  }

  export type ExerciseCountAggregateOutputType = {
    id: number
    name: number
    exerciseGroupId: number
    recommendedMinReps: number
    recommendedMaxReps: number
    _all: number
  }


  export type ExerciseAvgAggregateInputType = {
    recommendedMinReps?: true
    recommendedMaxReps?: true
  }

  export type ExerciseSumAggregateInputType = {
    recommendedMinReps?: true
    recommendedMaxReps?: true
  }

  export type ExerciseMinAggregateInputType = {
    id?: true
    name?: true
    exerciseGroupId?: true
    recommendedMinReps?: true
    recommendedMaxReps?: true
  }

  export type ExerciseMaxAggregateInputType = {
    id?: true
    name?: true
    exerciseGroupId?: true
    recommendedMinReps?: true
    recommendedMaxReps?: true
  }

  export type ExerciseCountAggregateInputType = {
    id?: true
    name?: true
    exerciseGroupId?: true
    recommendedMinReps?: true
    recommendedMaxReps?: true
    _all?: true
  }

  export type ExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exercises
    **/
    _count?: true | ExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExerciseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExerciseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseMaxAggregateInputType
  }

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>
  }




  export type ExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[]
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum
    having?: ExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseCountAggregateInputType | true
    _avg?: ExerciseAvgAggregateInputType
    _sum?: ExerciseSumAggregateInputType
    _min?: ExerciseMinAggregateInputType
    _max?: ExerciseMaxAggregateInputType
  }

  export type ExerciseGroupByOutputType = {
    id: string
    name: string
    exerciseGroupId: string
    recommendedMinReps: number | null
    recommendedMaxReps: number | null
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    exerciseGroupId?: boolean
    recommendedMinReps?: boolean
    recommendedMaxReps?: boolean
    exerciseGroup?: boolean | ExerciseGroupDefaultArgs<ExtArgs>
    dayExercises?: boolean | Exercise$dayExercisesArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    exerciseGroupId?: boolean
    recommendedMinReps?: boolean
    recommendedMaxReps?: boolean
    exerciseGroup?: boolean | ExerciseGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    exerciseGroupId?: boolean
    recommendedMinReps?: boolean
    recommendedMaxReps?: boolean
    exerciseGroup?: boolean | ExerciseGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectScalar = {
    id?: boolean
    name?: boolean
    exerciseGroupId?: boolean
    recommendedMinReps?: boolean
    recommendedMaxReps?: boolean
  }

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "exerciseGroupId" | "recommendedMinReps" | "recommendedMaxReps", ExtArgs["result"]["exercise"]>
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exerciseGroup?: boolean | ExerciseGroupDefaultArgs<ExtArgs>
    dayExercises?: boolean | Exercise$dayExercisesArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exerciseGroup?: boolean | ExerciseGroupDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exerciseGroup?: boolean | ExerciseGroupDefaultArgs<ExtArgs>
  }

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exercise"
    objects: {
      exerciseGroup: Prisma.$ExerciseGroupPayload<ExtArgs>
      dayExercises: Prisma.$DayExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      exerciseGroupId: string
      recommendedMinReps: number | null
      recommendedMaxReps: number | null
    }, ExtArgs["result"]["exercise"]>
    composites: {}
  }

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> = $Result.GetResult<Prisma.$ExercisePayload, S>

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseCountAggregateInputType | true
    }

  export interface ExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exercise'], meta: { name: 'Exercise' } }
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     * 
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseFindManyArgs>(args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     * 
     */
    create<T extends ExerciseCreateArgs>(args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseCreateManyArgs>(args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exercises and returns the data saved in the database.
     * @param {ExerciseCreateManyAndReturnArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     * 
     */
    delete<T extends ExerciseDeleteArgs>(args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseUpdateArgs>(args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseUpdateManyArgs>(args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises and returns the data updated in the database.
     * @param {ExerciseUpdateManyAndReturnArgs} args - Arguments to update many Exercises.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
    **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExerciseAggregateArgs>(args: Subset<T, ExerciseAggregateArgs>): Prisma.PrismaPromise<GetExerciseAggregateType<T>>

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exercise model
   */
  readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exerciseGroup<T extends ExerciseGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExerciseGroupDefaultArgs<ExtArgs>>): Prisma__ExerciseGroupClient<$Result.GetResult<Prisma.$ExerciseGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dayExercises<T extends Exercise$dayExercisesArgs<ExtArgs> = {}>(args?: Subset<T, Exercise$dayExercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<"Exercise", 'String'>
    readonly name: FieldRef<"Exercise", 'String'>
    readonly exerciseGroupId: FieldRef<"Exercise", 'String'>
    readonly recommendedMinReps: FieldRef<"Exercise", 'Int'>
    readonly recommendedMaxReps: FieldRef<"Exercise", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
  }

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exercise createManyAndReturn
   */
  export type ExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise updateManyAndReturn
   */
  export type ExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
  }

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number
  }

  /**
   * Exercise.dayExercises
   */
  export type Exercise$dayExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    where?: DayExerciseWhereInput
    orderBy?: DayExerciseOrderByWithRelationInput | DayExerciseOrderByWithRelationInput[]
    cursor?: DayExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DayExerciseScalarFieldEnum | DayExerciseScalarFieldEnum[]
  }

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    subscriptionAmount: number | null
  }

  export type UserSumAggregateOutputType = {
    subscriptionAmount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    email: string | null
    password: string | null
    isocode: string | null
    lastVisitedWeek: string | null
    registrationDate: Date | null
    hidingDate: Date | null
    subscriptionAmount: number | null
    subscriptionFrequency: string | null
    role: $Enums.Role | null
    hidden: boolean | null
    lastOKLogin: Date | null
    lastKOLogin: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    email: string | null
    password: string | null
    isocode: string | null
    lastVisitedWeek: string | null
    registrationDate: Date | null
    hidingDate: Date | null
    subscriptionAmount: number | null
    subscriptionFrequency: string | null
    role: $Enums.Role | null
    hidden: boolean | null
    lastOKLogin: Date | null
    lastKOLogin: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    username: number
    email: number
    password: number
    isocode: number
    lastVisitedWeek: number
    registrationDate: number
    hidingDate: number
    subscriptionAmount: number
    subscriptionFrequency: number
    role: number
    hidden: number
    lastOKLogin: number
    lastKOLogin: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    subscriptionAmount?: true
  }

  export type UserSumAggregateInputType = {
    subscriptionAmount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    password?: true
    isocode?: true
    lastVisitedWeek?: true
    registrationDate?: true
    hidingDate?: true
    subscriptionAmount?: true
    subscriptionFrequency?: true
    role?: true
    hidden?: true
    lastOKLogin?: true
    lastKOLogin?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    password?: true
    isocode?: true
    lastVisitedWeek?: true
    registrationDate?: true
    hidingDate?: true
    subscriptionAmount?: true
    subscriptionFrequency?: true
    role?: true
    hidden?: true
    lastOKLogin?: true
    lastKOLogin?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    password?: true
    isocode?: true
    lastVisitedWeek?: true
    registrationDate?: true
    hidingDate?: true
    subscriptionAmount?: true
    subscriptionFrequency?: true
    role?: true
    hidden?: true
    lastOKLogin?: true
    lastKOLogin?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    username: string
    email: string
    password: string | null
    isocode: string | null
    lastVisitedWeek: string | null
    registrationDate: Date
    hidingDate: Date | null
    subscriptionAmount: number | null
    subscriptionFrequency: string | null
    role: $Enums.Role
    hidden: boolean
    lastOKLogin: Date | null
    lastKOLogin: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    isocode?: boolean
    lastVisitedWeek?: boolean
    registrationDate?: boolean
    hidingDate?: boolean
    subscriptionAmount?: boolean
    subscriptionFrequency?: boolean
    role?: boolean
    hidden?: boolean
    lastOKLogin?: boolean
    lastKOLogin?: boolean
    blocks?: boolean | User$blocksArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    isocode?: boolean
    lastVisitedWeek?: boolean
    registrationDate?: boolean
    hidingDate?: boolean
    subscriptionAmount?: boolean
    subscriptionFrequency?: boolean
    role?: boolean
    hidden?: boolean
    lastOKLogin?: boolean
    lastKOLogin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    isocode?: boolean
    lastVisitedWeek?: boolean
    registrationDate?: boolean
    hidingDate?: boolean
    subscriptionAmount?: boolean
    subscriptionFrequency?: boolean
    role?: boolean
    hidden?: boolean
    lastOKLogin?: boolean
    lastKOLogin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    isocode?: boolean
    lastVisitedWeek?: boolean
    registrationDate?: boolean
    hidingDate?: boolean
    subscriptionAmount?: boolean
    subscriptionFrequency?: boolean
    role?: boolean
    hidden?: boolean
    lastOKLogin?: boolean
    lastKOLogin?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "username" | "email" | "password" | "isocode" | "lastVisitedWeek" | "registrationDate" | "hidingDate" | "subscriptionAmount" | "subscriptionFrequency" | "role" | "hidden" | "lastOKLogin" | "lastKOLogin", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocks?: boolean | User$blocksArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      blocks: Prisma.$TrainingBlockPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      username: string
      email: string
      password: string | null
      isocode: string | null
      lastVisitedWeek: string | null
      registrationDate: Date
      hidingDate: Date | null
      subscriptionAmount: number | null
      subscriptionFrequency: string | null
      role: $Enums.Role
      hidden: boolean
      lastOKLogin: Date | null
      lastKOLogin: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blocks<T extends User$blocksArgs<ExtArgs> = {}>(args?: Subset<T, User$blocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isocode: FieldRef<"User", 'String'>
    readonly lastVisitedWeek: FieldRef<"User", 'String'>
    readonly registrationDate: FieldRef<"User", 'DateTime'>
    readonly hidingDate: FieldRef<"User", 'DateTime'>
    readonly subscriptionAmount: FieldRef<"User", 'Float'>
    readonly subscriptionFrequency: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly hidden: FieldRef<"User", 'Boolean'>
    readonly lastOKLogin: FieldRef<"User", 'DateTime'>
    readonly lastKOLogin: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.blocks
   */
  export type User$blocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingBlock
     */
    select?: TrainingBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingBlock
     */
    omit?: TrainingBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingBlockInclude<ExtArgs> | null
    where?: TrainingBlockWhereInput
    orderBy?: TrainingBlockOrderByWithRelationInput | TrainingBlockOrderByWithRelationInput[]
    cursor?: TrainingBlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingBlockScalarFieldEnum | TrainingBlockScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model DayExercise
   */

  export type AggregateDayExercise = {
    _count: DayExerciseCountAggregateOutputType | null
    _avg: DayExerciseAvgAggregateOutputType | null
    _sum: DayExerciseSumAggregateOutputType | null
    _min: DayExerciseMinAggregateOutputType | null
    _max: DayExerciseMaxAggregateOutputType | null
  }

  export type DayExerciseAvgAggregateOutputType = {
    exerciseNumber: number | null
  }

  export type DayExerciseSumAggregateOutputType = {
    exerciseNumber: number | null
  }

  export type DayExerciseMinAggregateOutputType = {
    id: string | null
    trainingDayId: string | null
    exerciseId: string | null
    athleteNotes: string | null
    trainerNotes: string | null
    day: string | null
    exerciseNumber: number | null
  }

  export type DayExerciseMaxAggregateOutputType = {
    id: string | null
    trainingDayId: string | null
    exerciseId: string | null
    athleteNotes: string | null
    trainerNotes: string | null
    day: string | null
    exerciseNumber: number | null
  }

  export type DayExerciseCountAggregateOutputType = {
    id: number
    trainingDayId: number
    exerciseId: number
    athleteNotes: number
    trainerNotes: number
    day: number
    exerciseNumber: number
    _all: number
  }


  export type DayExerciseAvgAggregateInputType = {
    exerciseNumber?: true
  }

  export type DayExerciseSumAggregateInputType = {
    exerciseNumber?: true
  }

  export type DayExerciseMinAggregateInputType = {
    id?: true
    trainingDayId?: true
    exerciseId?: true
    athleteNotes?: true
    trainerNotes?: true
    day?: true
    exerciseNumber?: true
  }

  export type DayExerciseMaxAggregateInputType = {
    id?: true
    trainingDayId?: true
    exerciseId?: true
    athleteNotes?: true
    trainerNotes?: true
    day?: true
    exerciseNumber?: true
  }

  export type DayExerciseCountAggregateInputType = {
    id?: true
    trainingDayId?: true
    exerciseId?: true
    athleteNotes?: true
    trainerNotes?: true
    day?: true
    exerciseNumber?: true
    _all?: true
  }

  export type DayExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DayExercise to aggregate.
     */
    where?: DayExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExercises to fetch.
     */
    orderBy?: DayExerciseOrderByWithRelationInput | DayExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DayExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DayExercises
    **/
    _count?: true | DayExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DayExerciseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DayExerciseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DayExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DayExerciseMaxAggregateInputType
  }

  export type GetDayExerciseAggregateType<T extends DayExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateDayExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDayExercise[P]>
      : GetScalarType<T[P], AggregateDayExercise[P]>
  }




  export type DayExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DayExerciseWhereInput
    orderBy?: DayExerciseOrderByWithAggregationInput | DayExerciseOrderByWithAggregationInput[]
    by: DayExerciseScalarFieldEnum[] | DayExerciseScalarFieldEnum
    having?: DayExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DayExerciseCountAggregateInputType | true
    _avg?: DayExerciseAvgAggregateInputType
    _sum?: DayExerciseSumAggregateInputType
    _min?: DayExerciseMinAggregateInputType
    _max?: DayExerciseMaxAggregateInputType
  }

  export type DayExerciseGroupByOutputType = {
    id: string
    trainingDayId: string
    exerciseId: string
    athleteNotes: string | null
    trainerNotes: string | null
    day: string
    exerciseNumber: number | null
    _count: DayExerciseCountAggregateOutputType | null
    _avg: DayExerciseAvgAggregateOutputType | null
    _sum: DayExerciseSumAggregateOutputType | null
    _min: DayExerciseMinAggregateOutputType | null
    _max: DayExerciseMaxAggregateOutputType | null
  }

  type GetDayExerciseGroupByPayload<T extends DayExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DayExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DayExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DayExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], DayExerciseGroupByOutputType[P]>
        }
      >
    >


  export type DayExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingDayId?: boolean
    exerciseId?: boolean
    athleteNotes?: boolean
    trainerNotes?: boolean
    day?: boolean
    exerciseNumber?: boolean
    trainingDay?: boolean | TrainingDayDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    series?: boolean | DayExercise$seriesArgs<ExtArgs>
    _count?: boolean | DayExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dayExercise"]>

  export type DayExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingDayId?: boolean
    exerciseId?: boolean
    athleteNotes?: boolean
    trainerNotes?: boolean
    day?: boolean
    exerciseNumber?: boolean
    trainingDay?: boolean | TrainingDayDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dayExercise"]>

  export type DayExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingDayId?: boolean
    exerciseId?: boolean
    athleteNotes?: boolean
    trainerNotes?: boolean
    day?: boolean
    exerciseNumber?: boolean
    trainingDay?: boolean | TrainingDayDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dayExercise"]>

  export type DayExerciseSelectScalar = {
    id?: boolean
    trainingDayId?: boolean
    exerciseId?: boolean
    athleteNotes?: boolean
    trainerNotes?: boolean
    day?: boolean
    exerciseNumber?: boolean
  }

  export type DayExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainingDayId" | "exerciseId" | "athleteNotes" | "trainerNotes" | "day" | "exerciseNumber", ExtArgs["result"]["dayExercise"]>
  export type DayExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingDay?: boolean | TrainingDayDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    series?: boolean | DayExercise$seriesArgs<ExtArgs>
    _count?: boolean | DayExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DayExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingDay?: boolean | TrainingDayDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }
  export type DayExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingDay?: boolean | TrainingDayDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }

  export type $DayExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DayExercise"
    objects: {
      trainingDay: Prisma.$TrainingDayPayload<ExtArgs>
      exercise: Prisma.$ExercisePayload<ExtArgs>
      series: Prisma.$DayExerciseSeriesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainingDayId: string
      exerciseId: string
      athleteNotes: string | null
      trainerNotes: string | null
      day: string
      exerciseNumber: number | null
    }, ExtArgs["result"]["dayExercise"]>
    composites: {}
  }

  type DayExerciseGetPayload<S extends boolean | null | undefined | DayExerciseDefaultArgs> = $Result.GetResult<Prisma.$DayExercisePayload, S>

  type DayExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DayExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DayExerciseCountAggregateInputType | true
    }

  export interface DayExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DayExercise'], meta: { name: 'DayExercise' } }
    /**
     * Find zero or one DayExercise that matches the filter.
     * @param {DayExerciseFindUniqueArgs} args - Arguments to find a DayExercise
     * @example
     * // Get one DayExercise
     * const dayExercise = await prisma.dayExercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DayExerciseFindUniqueArgs>(args: SelectSubset<T, DayExerciseFindUniqueArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DayExercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DayExerciseFindUniqueOrThrowArgs} args - Arguments to find a DayExercise
     * @example
     * // Get one DayExercise
     * const dayExercise = await prisma.dayExercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DayExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, DayExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DayExercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseFindFirstArgs} args - Arguments to find a DayExercise
     * @example
     * // Get one DayExercise
     * const dayExercise = await prisma.dayExercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DayExerciseFindFirstArgs>(args?: SelectSubset<T, DayExerciseFindFirstArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DayExercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseFindFirstOrThrowArgs} args - Arguments to find a DayExercise
     * @example
     * // Get one DayExercise
     * const dayExercise = await prisma.dayExercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DayExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, DayExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DayExercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DayExercises
     * const dayExercises = await prisma.dayExercise.findMany()
     * 
     * // Get first 10 DayExercises
     * const dayExercises = await prisma.dayExercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dayExerciseWithIdOnly = await prisma.dayExercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DayExerciseFindManyArgs>(args?: SelectSubset<T, DayExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DayExercise.
     * @param {DayExerciseCreateArgs} args - Arguments to create a DayExercise.
     * @example
     * // Create one DayExercise
     * const DayExercise = await prisma.dayExercise.create({
     *   data: {
     *     // ... data to create a DayExercise
     *   }
     * })
     * 
     */
    create<T extends DayExerciseCreateArgs>(args: SelectSubset<T, DayExerciseCreateArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DayExercises.
     * @param {DayExerciseCreateManyArgs} args - Arguments to create many DayExercises.
     * @example
     * // Create many DayExercises
     * const dayExercise = await prisma.dayExercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DayExerciseCreateManyArgs>(args?: SelectSubset<T, DayExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DayExercises and returns the data saved in the database.
     * @param {DayExerciseCreateManyAndReturnArgs} args - Arguments to create many DayExercises.
     * @example
     * // Create many DayExercises
     * const dayExercise = await prisma.dayExercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DayExercises and only return the `id`
     * const dayExerciseWithIdOnly = await prisma.dayExercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DayExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, DayExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DayExercise.
     * @param {DayExerciseDeleteArgs} args - Arguments to delete one DayExercise.
     * @example
     * // Delete one DayExercise
     * const DayExercise = await prisma.dayExercise.delete({
     *   where: {
     *     // ... filter to delete one DayExercise
     *   }
     * })
     * 
     */
    delete<T extends DayExerciseDeleteArgs>(args: SelectSubset<T, DayExerciseDeleteArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DayExercise.
     * @param {DayExerciseUpdateArgs} args - Arguments to update one DayExercise.
     * @example
     * // Update one DayExercise
     * const dayExercise = await prisma.dayExercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DayExerciseUpdateArgs>(args: SelectSubset<T, DayExerciseUpdateArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DayExercises.
     * @param {DayExerciseDeleteManyArgs} args - Arguments to filter DayExercises to delete.
     * @example
     * // Delete a few DayExercises
     * const { count } = await prisma.dayExercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DayExerciseDeleteManyArgs>(args?: SelectSubset<T, DayExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DayExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DayExercises
     * const dayExercise = await prisma.dayExercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DayExerciseUpdateManyArgs>(args: SelectSubset<T, DayExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DayExercises and returns the data updated in the database.
     * @param {DayExerciseUpdateManyAndReturnArgs} args - Arguments to update many DayExercises.
     * @example
     * // Update many DayExercises
     * const dayExercise = await prisma.dayExercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DayExercises and only return the `id`
     * const dayExerciseWithIdOnly = await prisma.dayExercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DayExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, DayExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DayExercise.
     * @param {DayExerciseUpsertArgs} args - Arguments to update or create a DayExercise.
     * @example
     * // Update or create a DayExercise
     * const dayExercise = await prisma.dayExercise.upsert({
     *   create: {
     *     // ... data to create a DayExercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DayExercise we want to update
     *   }
     * })
     */
    upsert<T extends DayExerciseUpsertArgs>(args: SelectSubset<T, DayExerciseUpsertArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DayExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseCountArgs} args - Arguments to filter DayExercises to count.
     * @example
     * // Count the number of DayExercises
     * const count = await prisma.dayExercise.count({
     *   where: {
     *     // ... the filter for the DayExercises we want to count
     *   }
     * })
    **/
    count<T extends DayExerciseCountArgs>(
      args?: Subset<T, DayExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DayExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DayExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DayExerciseAggregateArgs>(args: Subset<T, DayExerciseAggregateArgs>): Prisma.PrismaPromise<GetDayExerciseAggregateType<T>>

    /**
     * Group by DayExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DayExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DayExerciseGroupByArgs['orderBy'] }
        : { orderBy?: DayExerciseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DayExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDayExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DayExercise model
   */
  readonly fields: DayExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DayExercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DayExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingDay<T extends TrainingDayDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingDayDefaultArgs<ExtArgs>>): Prisma__TrainingDayClient<$Result.GetResult<Prisma.$TrainingDayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    exercise<T extends ExerciseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExerciseDefaultArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    series<T extends DayExercise$seriesArgs<ExtArgs> = {}>(args?: Subset<T, DayExercise$seriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DayExercise model
   */
  interface DayExerciseFieldRefs {
    readonly id: FieldRef<"DayExercise", 'String'>
    readonly trainingDayId: FieldRef<"DayExercise", 'String'>
    readonly exerciseId: FieldRef<"DayExercise", 'String'>
    readonly athleteNotes: FieldRef<"DayExercise", 'String'>
    readonly trainerNotes: FieldRef<"DayExercise", 'String'>
    readonly day: FieldRef<"DayExercise", 'String'>
    readonly exerciseNumber: FieldRef<"DayExercise", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DayExercise findUnique
   */
  export type DayExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * Filter, which DayExercise to fetch.
     */
    where: DayExerciseWhereUniqueInput
  }

  /**
   * DayExercise findUniqueOrThrow
   */
  export type DayExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * Filter, which DayExercise to fetch.
     */
    where: DayExerciseWhereUniqueInput
  }

  /**
   * DayExercise findFirst
   */
  export type DayExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * Filter, which DayExercise to fetch.
     */
    where?: DayExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExercises to fetch.
     */
    orderBy?: DayExerciseOrderByWithRelationInput | DayExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DayExercises.
     */
    cursor?: DayExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DayExercises.
     */
    distinct?: DayExerciseScalarFieldEnum | DayExerciseScalarFieldEnum[]
  }

  /**
   * DayExercise findFirstOrThrow
   */
  export type DayExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * Filter, which DayExercise to fetch.
     */
    where?: DayExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExercises to fetch.
     */
    orderBy?: DayExerciseOrderByWithRelationInput | DayExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DayExercises.
     */
    cursor?: DayExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DayExercises.
     */
    distinct?: DayExerciseScalarFieldEnum | DayExerciseScalarFieldEnum[]
  }

  /**
   * DayExercise findMany
   */
  export type DayExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * Filter, which DayExercises to fetch.
     */
    where?: DayExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExercises to fetch.
     */
    orderBy?: DayExerciseOrderByWithRelationInput | DayExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DayExercises.
     */
    cursor?: DayExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExercises.
     */
    skip?: number
    distinct?: DayExerciseScalarFieldEnum | DayExerciseScalarFieldEnum[]
  }

  /**
   * DayExercise create
   */
  export type DayExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a DayExercise.
     */
    data: XOR<DayExerciseCreateInput, DayExerciseUncheckedCreateInput>
  }

  /**
   * DayExercise createMany
   */
  export type DayExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DayExercises.
     */
    data: DayExerciseCreateManyInput | DayExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DayExercise createManyAndReturn
   */
  export type DayExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many DayExercises.
     */
    data: DayExerciseCreateManyInput | DayExerciseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DayExercise update
   */
  export type DayExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a DayExercise.
     */
    data: XOR<DayExerciseUpdateInput, DayExerciseUncheckedUpdateInput>
    /**
     * Choose, which DayExercise to update.
     */
    where: DayExerciseWhereUniqueInput
  }

  /**
   * DayExercise updateMany
   */
  export type DayExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DayExercises.
     */
    data: XOR<DayExerciseUpdateManyMutationInput, DayExerciseUncheckedUpdateManyInput>
    /**
     * Filter which DayExercises to update
     */
    where?: DayExerciseWhereInput
    /**
     * Limit how many DayExercises to update.
     */
    limit?: number
  }

  /**
   * DayExercise updateManyAndReturn
   */
  export type DayExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * The data used to update DayExercises.
     */
    data: XOR<DayExerciseUpdateManyMutationInput, DayExerciseUncheckedUpdateManyInput>
    /**
     * Filter which DayExercises to update
     */
    where?: DayExerciseWhereInput
    /**
     * Limit how many DayExercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DayExercise upsert
   */
  export type DayExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the DayExercise to update in case it exists.
     */
    where: DayExerciseWhereUniqueInput
    /**
     * In case the DayExercise found by the `where` argument doesn't exist, create a new DayExercise with this data.
     */
    create: XOR<DayExerciseCreateInput, DayExerciseUncheckedCreateInput>
    /**
     * In case the DayExercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DayExerciseUpdateInput, DayExerciseUncheckedUpdateInput>
  }

  /**
   * DayExercise delete
   */
  export type DayExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
    /**
     * Filter which DayExercise to delete.
     */
    where: DayExerciseWhereUniqueInput
  }

  /**
   * DayExercise deleteMany
   */
  export type DayExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DayExercises to delete
     */
    where?: DayExerciseWhereInput
    /**
     * Limit how many DayExercises to delete.
     */
    limit?: number
  }

  /**
   * DayExercise.series
   */
  export type DayExercise$seriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    where?: DayExerciseSeriesWhereInput
    orderBy?: DayExerciseSeriesOrderByWithRelationInput | DayExerciseSeriesOrderByWithRelationInput[]
    cursor?: DayExerciseSeriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DayExerciseSeriesScalarFieldEnum | DayExerciseSeriesScalarFieldEnum[]
  }

  /**
   * DayExercise without action
   */
  export type DayExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExercise
     */
    select?: DayExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExercise
     */
    omit?: DayExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseInclude<ExtArgs> | null
  }


  /**
   * Model DayExerciseSeries
   */

  export type AggregateDayExerciseSeries = {
    _count: DayExerciseSeriesCountAggregateOutputType | null
    _avg: DayExerciseSeriesAvgAggregateOutputType | null
    _sum: DayExerciseSeriesSumAggregateOutputType | null
    _min: DayExerciseSeriesMinAggregateOutputType | null
    _max: DayExerciseSeriesMaxAggregateOutputType | null
  }

  export type DayExerciseSeriesAvgAggregateOutputType = {
    seriesNumber: number | null
    minReps: number | null
    maxReps: number | null
    minRir: number | null
    maxRir: number | null
    effectiveReps: number | null
    effectiveWeight: number | null
    effectiveRir: number | null
  }

  export type DayExerciseSeriesSumAggregateOutputType = {
    seriesNumber: number | null
    minReps: number | null
    maxReps: number | null
    minRir: number | null
    maxRir: number | null
    effectiveReps: number | null
    effectiveWeight: number | null
    effectiveRir: number | null
  }

  export type DayExerciseSeriesMinAggregateOutputType = {
    id: string | null
    dayExerciseId: string | null
    seriesNumber: number | null
    minReps: number | null
    maxReps: number | null
    minRir: number | null
    maxRir: number | null
    effectiveReps: number | null
    effectiveWeight: number | null
    effectiveRir: number | null
    trainingWeekId: string | null
    isDropset: boolean | null
  }

  export type DayExerciseSeriesMaxAggregateOutputType = {
    id: string | null
    dayExerciseId: string | null
    seriesNumber: number | null
    minReps: number | null
    maxReps: number | null
    minRir: number | null
    maxRir: number | null
    effectiveReps: number | null
    effectiveWeight: number | null
    effectiveRir: number | null
    trainingWeekId: string | null
    isDropset: boolean | null
  }

  export type DayExerciseSeriesCountAggregateOutputType = {
    id: number
    dayExerciseId: number
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps: number
    effectiveWeight: number
    effectiveRir: number
    trainingWeekId: number
    isDropset: number
    _all: number
  }


  export type DayExerciseSeriesAvgAggregateInputType = {
    seriesNumber?: true
    minReps?: true
    maxReps?: true
    minRir?: true
    maxRir?: true
    effectiveReps?: true
    effectiveWeight?: true
    effectiveRir?: true
  }

  export type DayExerciseSeriesSumAggregateInputType = {
    seriesNumber?: true
    minReps?: true
    maxReps?: true
    minRir?: true
    maxRir?: true
    effectiveReps?: true
    effectiveWeight?: true
    effectiveRir?: true
  }

  export type DayExerciseSeriesMinAggregateInputType = {
    id?: true
    dayExerciseId?: true
    seriesNumber?: true
    minReps?: true
    maxReps?: true
    minRir?: true
    maxRir?: true
    effectiveReps?: true
    effectiveWeight?: true
    effectiveRir?: true
    trainingWeekId?: true
    isDropset?: true
  }

  export type DayExerciseSeriesMaxAggregateInputType = {
    id?: true
    dayExerciseId?: true
    seriesNumber?: true
    minReps?: true
    maxReps?: true
    minRir?: true
    maxRir?: true
    effectiveReps?: true
    effectiveWeight?: true
    effectiveRir?: true
    trainingWeekId?: true
    isDropset?: true
  }

  export type DayExerciseSeriesCountAggregateInputType = {
    id?: true
    dayExerciseId?: true
    seriesNumber?: true
    minReps?: true
    maxReps?: true
    minRir?: true
    maxRir?: true
    effectiveReps?: true
    effectiveWeight?: true
    effectiveRir?: true
    trainingWeekId?: true
    isDropset?: true
    _all?: true
  }

  export type DayExerciseSeriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DayExerciseSeries to aggregate.
     */
    where?: DayExerciseSeriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExerciseSeries to fetch.
     */
    orderBy?: DayExerciseSeriesOrderByWithRelationInput | DayExerciseSeriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DayExerciseSeriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExerciseSeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExerciseSeries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DayExerciseSeries
    **/
    _count?: true | DayExerciseSeriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DayExerciseSeriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DayExerciseSeriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DayExerciseSeriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DayExerciseSeriesMaxAggregateInputType
  }

  export type GetDayExerciseSeriesAggregateType<T extends DayExerciseSeriesAggregateArgs> = {
        [P in keyof T & keyof AggregateDayExerciseSeries]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDayExerciseSeries[P]>
      : GetScalarType<T[P], AggregateDayExerciseSeries[P]>
  }




  export type DayExerciseSeriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DayExerciseSeriesWhereInput
    orderBy?: DayExerciseSeriesOrderByWithAggregationInput | DayExerciseSeriesOrderByWithAggregationInput[]
    by: DayExerciseSeriesScalarFieldEnum[] | DayExerciseSeriesScalarFieldEnum
    having?: DayExerciseSeriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DayExerciseSeriesCountAggregateInputType | true
    _avg?: DayExerciseSeriesAvgAggregateInputType
    _sum?: DayExerciseSeriesSumAggregateInputType
    _min?: DayExerciseSeriesMinAggregateInputType
    _max?: DayExerciseSeriesMaxAggregateInputType
  }

  export type DayExerciseSeriesGroupByOutputType = {
    id: string
    dayExerciseId: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps: number | null
    effectiveWeight: number | null
    effectiveRir: number | null
    trainingWeekId: string
    isDropset: boolean
    _count: DayExerciseSeriesCountAggregateOutputType | null
    _avg: DayExerciseSeriesAvgAggregateOutputType | null
    _sum: DayExerciseSeriesSumAggregateOutputType | null
    _min: DayExerciseSeriesMinAggregateOutputType | null
    _max: DayExerciseSeriesMaxAggregateOutputType | null
  }

  type GetDayExerciseSeriesGroupByPayload<T extends DayExerciseSeriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DayExerciseSeriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DayExerciseSeriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DayExerciseSeriesGroupByOutputType[P]>
            : GetScalarType<T[P], DayExerciseSeriesGroupByOutputType[P]>
        }
      >
    >


  export type DayExerciseSeriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dayExerciseId?: boolean
    seriesNumber?: boolean
    minReps?: boolean
    maxReps?: boolean
    minRir?: boolean
    maxRir?: boolean
    effectiveReps?: boolean
    effectiveWeight?: boolean
    effectiveRir?: boolean
    trainingWeekId?: boolean
    isDropset?: boolean
    dayExercise?: boolean | DayExerciseDefaultArgs<ExtArgs>
    trainingWeek?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dayExerciseSeries"]>

  export type DayExerciseSeriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dayExerciseId?: boolean
    seriesNumber?: boolean
    minReps?: boolean
    maxReps?: boolean
    minRir?: boolean
    maxRir?: boolean
    effectiveReps?: boolean
    effectiveWeight?: boolean
    effectiveRir?: boolean
    trainingWeekId?: boolean
    isDropset?: boolean
    dayExercise?: boolean | DayExerciseDefaultArgs<ExtArgs>
    trainingWeek?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dayExerciseSeries"]>

  export type DayExerciseSeriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dayExerciseId?: boolean
    seriesNumber?: boolean
    minReps?: boolean
    maxReps?: boolean
    minRir?: boolean
    maxRir?: boolean
    effectiveReps?: boolean
    effectiveWeight?: boolean
    effectiveRir?: boolean
    trainingWeekId?: boolean
    isDropset?: boolean
    dayExercise?: boolean | DayExerciseDefaultArgs<ExtArgs>
    trainingWeek?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dayExerciseSeries"]>

  export type DayExerciseSeriesSelectScalar = {
    id?: boolean
    dayExerciseId?: boolean
    seriesNumber?: boolean
    minReps?: boolean
    maxReps?: boolean
    minRir?: boolean
    maxRir?: boolean
    effectiveReps?: boolean
    effectiveWeight?: boolean
    effectiveRir?: boolean
    trainingWeekId?: boolean
    isDropset?: boolean
  }

  export type DayExerciseSeriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dayExerciseId" | "seriesNumber" | "minReps" | "maxReps" | "minRir" | "maxRir" | "effectiveReps" | "effectiveWeight" | "effectiveRir" | "trainingWeekId" | "isDropset", ExtArgs["result"]["dayExerciseSeries"]>
  export type DayExerciseSeriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dayExercise?: boolean | DayExerciseDefaultArgs<ExtArgs>
    trainingWeek?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }
  export type DayExerciseSeriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dayExercise?: boolean | DayExerciseDefaultArgs<ExtArgs>
    trainingWeek?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }
  export type DayExerciseSeriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dayExercise?: boolean | DayExerciseDefaultArgs<ExtArgs>
    trainingWeek?: boolean | TrainingWeekDefaultArgs<ExtArgs>
  }

  export type $DayExerciseSeriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DayExerciseSeries"
    objects: {
      dayExercise: Prisma.$DayExercisePayload<ExtArgs>
      trainingWeek: Prisma.$TrainingWeekPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dayExerciseId: string
      seriesNumber: number
      minReps: number
      maxReps: number
      minRir: number
      maxRir: number
      effectiveReps: number | null
      effectiveWeight: number | null
      effectiveRir: number | null
      trainingWeekId: string
      isDropset: boolean
    }, ExtArgs["result"]["dayExerciseSeries"]>
    composites: {}
  }

  type DayExerciseSeriesGetPayload<S extends boolean | null | undefined | DayExerciseSeriesDefaultArgs> = $Result.GetResult<Prisma.$DayExerciseSeriesPayload, S>

  type DayExerciseSeriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DayExerciseSeriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DayExerciseSeriesCountAggregateInputType | true
    }

  export interface DayExerciseSeriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DayExerciseSeries'], meta: { name: 'DayExerciseSeries' } }
    /**
     * Find zero or one DayExerciseSeries that matches the filter.
     * @param {DayExerciseSeriesFindUniqueArgs} args - Arguments to find a DayExerciseSeries
     * @example
     * // Get one DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DayExerciseSeriesFindUniqueArgs>(args: SelectSubset<T, DayExerciseSeriesFindUniqueArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DayExerciseSeries that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DayExerciseSeriesFindUniqueOrThrowArgs} args - Arguments to find a DayExerciseSeries
     * @example
     * // Get one DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DayExerciseSeriesFindUniqueOrThrowArgs>(args: SelectSubset<T, DayExerciseSeriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DayExerciseSeries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseSeriesFindFirstArgs} args - Arguments to find a DayExerciseSeries
     * @example
     * // Get one DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DayExerciseSeriesFindFirstArgs>(args?: SelectSubset<T, DayExerciseSeriesFindFirstArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DayExerciseSeries that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseSeriesFindFirstOrThrowArgs} args - Arguments to find a DayExerciseSeries
     * @example
     * // Get one DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DayExerciseSeriesFindFirstOrThrowArgs>(args?: SelectSubset<T, DayExerciseSeriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DayExerciseSeries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseSeriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.findMany()
     * 
     * // Get first 10 DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dayExerciseSeriesWithIdOnly = await prisma.dayExerciseSeries.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DayExerciseSeriesFindManyArgs>(args?: SelectSubset<T, DayExerciseSeriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DayExerciseSeries.
     * @param {DayExerciseSeriesCreateArgs} args - Arguments to create a DayExerciseSeries.
     * @example
     * // Create one DayExerciseSeries
     * const DayExerciseSeries = await prisma.dayExerciseSeries.create({
     *   data: {
     *     // ... data to create a DayExerciseSeries
     *   }
     * })
     * 
     */
    create<T extends DayExerciseSeriesCreateArgs>(args: SelectSubset<T, DayExerciseSeriesCreateArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DayExerciseSeries.
     * @param {DayExerciseSeriesCreateManyArgs} args - Arguments to create many DayExerciseSeries.
     * @example
     * // Create many DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DayExerciseSeriesCreateManyArgs>(args?: SelectSubset<T, DayExerciseSeriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DayExerciseSeries and returns the data saved in the database.
     * @param {DayExerciseSeriesCreateManyAndReturnArgs} args - Arguments to create many DayExerciseSeries.
     * @example
     * // Create many DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DayExerciseSeries and only return the `id`
     * const dayExerciseSeriesWithIdOnly = await prisma.dayExerciseSeries.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DayExerciseSeriesCreateManyAndReturnArgs>(args?: SelectSubset<T, DayExerciseSeriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DayExerciseSeries.
     * @param {DayExerciseSeriesDeleteArgs} args - Arguments to delete one DayExerciseSeries.
     * @example
     * // Delete one DayExerciseSeries
     * const DayExerciseSeries = await prisma.dayExerciseSeries.delete({
     *   where: {
     *     // ... filter to delete one DayExerciseSeries
     *   }
     * })
     * 
     */
    delete<T extends DayExerciseSeriesDeleteArgs>(args: SelectSubset<T, DayExerciseSeriesDeleteArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DayExerciseSeries.
     * @param {DayExerciseSeriesUpdateArgs} args - Arguments to update one DayExerciseSeries.
     * @example
     * // Update one DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DayExerciseSeriesUpdateArgs>(args: SelectSubset<T, DayExerciseSeriesUpdateArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DayExerciseSeries.
     * @param {DayExerciseSeriesDeleteManyArgs} args - Arguments to filter DayExerciseSeries to delete.
     * @example
     * // Delete a few DayExerciseSeries
     * const { count } = await prisma.dayExerciseSeries.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DayExerciseSeriesDeleteManyArgs>(args?: SelectSubset<T, DayExerciseSeriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DayExerciseSeries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseSeriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DayExerciseSeriesUpdateManyArgs>(args: SelectSubset<T, DayExerciseSeriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DayExerciseSeries and returns the data updated in the database.
     * @param {DayExerciseSeriesUpdateManyAndReturnArgs} args - Arguments to update many DayExerciseSeries.
     * @example
     * // Update many DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DayExerciseSeries and only return the `id`
     * const dayExerciseSeriesWithIdOnly = await prisma.dayExerciseSeries.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DayExerciseSeriesUpdateManyAndReturnArgs>(args: SelectSubset<T, DayExerciseSeriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DayExerciseSeries.
     * @param {DayExerciseSeriesUpsertArgs} args - Arguments to update or create a DayExerciseSeries.
     * @example
     * // Update or create a DayExerciseSeries
     * const dayExerciseSeries = await prisma.dayExerciseSeries.upsert({
     *   create: {
     *     // ... data to create a DayExerciseSeries
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DayExerciseSeries we want to update
     *   }
     * })
     */
    upsert<T extends DayExerciseSeriesUpsertArgs>(args: SelectSubset<T, DayExerciseSeriesUpsertArgs<ExtArgs>>): Prisma__DayExerciseSeriesClient<$Result.GetResult<Prisma.$DayExerciseSeriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DayExerciseSeries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseSeriesCountArgs} args - Arguments to filter DayExerciseSeries to count.
     * @example
     * // Count the number of DayExerciseSeries
     * const count = await prisma.dayExerciseSeries.count({
     *   where: {
     *     // ... the filter for the DayExerciseSeries we want to count
     *   }
     * })
    **/
    count<T extends DayExerciseSeriesCountArgs>(
      args?: Subset<T, DayExerciseSeriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DayExerciseSeriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DayExerciseSeries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseSeriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DayExerciseSeriesAggregateArgs>(args: Subset<T, DayExerciseSeriesAggregateArgs>): Prisma.PrismaPromise<GetDayExerciseSeriesAggregateType<T>>

    /**
     * Group by DayExerciseSeries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayExerciseSeriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DayExerciseSeriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DayExerciseSeriesGroupByArgs['orderBy'] }
        : { orderBy?: DayExerciseSeriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DayExerciseSeriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDayExerciseSeriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DayExerciseSeries model
   */
  readonly fields: DayExerciseSeriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DayExerciseSeries.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DayExerciseSeriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dayExercise<T extends DayExerciseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DayExerciseDefaultArgs<ExtArgs>>): Prisma__DayExerciseClient<$Result.GetResult<Prisma.$DayExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainingWeek<T extends TrainingWeekDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingWeekDefaultArgs<ExtArgs>>): Prisma__TrainingWeekClient<$Result.GetResult<Prisma.$TrainingWeekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DayExerciseSeries model
   */
  interface DayExerciseSeriesFieldRefs {
    readonly id: FieldRef<"DayExerciseSeries", 'String'>
    readonly dayExerciseId: FieldRef<"DayExerciseSeries", 'String'>
    readonly seriesNumber: FieldRef<"DayExerciseSeries", 'Int'>
    readonly minReps: FieldRef<"DayExerciseSeries", 'Int'>
    readonly maxReps: FieldRef<"DayExerciseSeries", 'Int'>
    readonly minRir: FieldRef<"DayExerciseSeries", 'Int'>
    readonly maxRir: FieldRef<"DayExerciseSeries", 'Int'>
    readonly effectiveReps: FieldRef<"DayExerciseSeries", 'Int'>
    readonly effectiveWeight: FieldRef<"DayExerciseSeries", 'Float'>
    readonly effectiveRir: FieldRef<"DayExerciseSeries", 'Int'>
    readonly trainingWeekId: FieldRef<"DayExerciseSeries", 'String'>
    readonly isDropset: FieldRef<"DayExerciseSeries", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * DayExerciseSeries findUnique
   */
  export type DayExerciseSeriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * Filter, which DayExerciseSeries to fetch.
     */
    where: DayExerciseSeriesWhereUniqueInput
  }

  /**
   * DayExerciseSeries findUniqueOrThrow
   */
  export type DayExerciseSeriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * Filter, which DayExerciseSeries to fetch.
     */
    where: DayExerciseSeriesWhereUniqueInput
  }

  /**
   * DayExerciseSeries findFirst
   */
  export type DayExerciseSeriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * Filter, which DayExerciseSeries to fetch.
     */
    where?: DayExerciseSeriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExerciseSeries to fetch.
     */
    orderBy?: DayExerciseSeriesOrderByWithRelationInput | DayExerciseSeriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DayExerciseSeries.
     */
    cursor?: DayExerciseSeriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExerciseSeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExerciseSeries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DayExerciseSeries.
     */
    distinct?: DayExerciseSeriesScalarFieldEnum | DayExerciseSeriesScalarFieldEnum[]
  }

  /**
   * DayExerciseSeries findFirstOrThrow
   */
  export type DayExerciseSeriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * Filter, which DayExerciseSeries to fetch.
     */
    where?: DayExerciseSeriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExerciseSeries to fetch.
     */
    orderBy?: DayExerciseSeriesOrderByWithRelationInput | DayExerciseSeriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DayExerciseSeries.
     */
    cursor?: DayExerciseSeriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExerciseSeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExerciseSeries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DayExerciseSeries.
     */
    distinct?: DayExerciseSeriesScalarFieldEnum | DayExerciseSeriesScalarFieldEnum[]
  }

  /**
   * DayExerciseSeries findMany
   */
  export type DayExerciseSeriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * Filter, which DayExerciseSeries to fetch.
     */
    where?: DayExerciseSeriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DayExerciseSeries to fetch.
     */
    orderBy?: DayExerciseSeriesOrderByWithRelationInput | DayExerciseSeriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DayExerciseSeries.
     */
    cursor?: DayExerciseSeriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DayExerciseSeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DayExerciseSeries.
     */
    skip?: number
    distinct?: DayExerciseSeriesScalarFieldEnum | DayExerciseSeriesScalarFieldEnum[]
  }

  /**
   * DayExerciseSeries create
   */
  export type DayExerciseSeriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * The data needed to create a DayExerciseSeries.
     */
    data: XOR<DayExerciseSeriesCreateInput, DayExerciseSeriesUncheckedCreateInput>
  }

  /**
   * DayExerciseSeries createMany
   */
  export type DayExerciseSeriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DayExerciseSeries.
     */
    data: DayExerciseSeriesCreateManyInput | DayExerciseSeriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DayExerciseSeries createManyAndReturn
   */
  export type DayExerciseSeriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * The data used to create many DayExerciseSeries.
     */
    data: DayExerciseSeriesCreateManyInput | DayExerciseSeriesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DayExerciseSeries update
   */
  export type DayExerciseSeriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * The data needed to update a DayExerciseSeries.
     */
    data: XOR<DayExerciseSeriesUpdateInput, DayExerciseSeriesUncheckedUpdateInput>
    /**
     * Choose, which DayExerciseSeries to update.
     */
    where: DayExerciseSeriesWhereUniqueInput
  }

  /**
   * DayExerciseSeries updateMany
   */
  export type DayExerciseSeriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DayExerciseSeries.
     */
    data: XOR<DayExerciseSeriesUpdateManyMutationInput, DayExerciseSeriesUncheckedUpdateManyInput>
    /**
     * Filter which DayExerciseSeries to update
     */
    where?: DayExerciseSeriesWhereInput
    /**
     * Limit how many DayExerciseSeries to update.
     */
    limit?: number
  }

  /**
   * DayExerciseSeries updateManyAndReturn
   */
  export type DayExerciseSeriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * The data used to update DayExerciseSeries.
     */
    data: XOR<DayExerciseSeriesUpdateManyMutationInput, DayExerciseSeriesUncheckedUpdateManyInput>
    /**
     * Filter which DayExerciseSeries to update
     */
    where?: DayExerciseSeriesWhereInput
    /**
     * Limit how many DayExerciseSeries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DayExerciseSeries upsert
   */
  export type DayExerciseSeriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * The filter to search for the DayExerciseSeries to update in case it exists.
     */
    where: DayExerciseSeriesWhereUniqueInput
    /**
     * In case the DayExerciseSeries found by the `where` argument doesn't exist, create a new DayExerciseSeries with this data.
     */
    create: XOR<DayExerciseSeriesCreateInput, DayExerciseSeriesUncheckedCreateInput>
    /**
     * In case the DayExerciseSeries was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DayExerciseSeriesUpdateInput, DayExerciseSeriesUncheckedUpdateInput>
  }

  /**
   * DayExerciseSeries delete
   */
  export type DayExerciseSeriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
    /**
     * Filter which DayExerciseSeries to delete.
     */
    where: DayExerciseSeriesWhereUniqueInput
  }

  /**
   * DayExerciseSeries deleteMany
   */
  export type DayExerciseSeriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DayExerciseSeries to delete
     */
    where?: DayExerciseSeriesWhereInput
    /**
     * Limit how many DayExerciseSeries to delete.
     */
    limit?: number
  }

  /**
   * DayExerciseSeries without action
   */
  export type DayExerciseSeriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayExerciseSeries
     */
    select?: DayExerciseSeriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DayExerciseSeries
     */
    omit?: DayExerciseSeriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DayExerciseSeriesInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    dueDate: Date | null
    amount: number | null
    isPayed: boolean | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dueDate: Date | null
    amount: number | null
    isPayed: boolean | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    userId: number
    dueDate: number
    amount: number
    isPayed: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    userId?: true
    dueDate?: true
    amount?: true
    isPayed?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    dueDate?: true
    amount?: true
    isPayed?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    userId?: true
    dueDate?: true
    amount?: true
    isPayed?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    userId: string
    dueDate: Date
    amount: number
    isPayed: boolean
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dueDate?: boolean
    amount?: boolean
    isPayed?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dueDate?: boolean
    amount?: boolean
    isPayed?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dueDate?: boolean
    amount?: boolean
    isPayed?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    dueDate?: boolean
    amount?: boolean
    isPayed?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "dueDate" | "amount" | "isPayed", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      dueDate: Date
      amount: number
      isPayed: boolean
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly userId: FieldRef<"Payment", 'String'>
    readonly dueDate: FieldRef<"Payment", 'DateTime'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly isPayed: FieldRef<"Payment", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TrainingBlockScalarFieldEnum: {
    isVisible: 'isVisible',
    id: 'id',
    blockNumber: 'blockNumber',
    description: 'description',
    userId: 'userId'
  };

  export type TrainingBlockScalarFieldEnum = (typeof TrainingBlockScalarFieldEnum)[keyof typeof TrainingBlockScalarFieldEnum]


  export const TrainingWeekScalarFieldEnum: {
    id: 'id',
    blockId: 'blockId',
    weekNumber: 'weekNumber',
    weekStart: 'weekStart',
    weekEnd: 'weekEnd'
  };

  export type TrainingWeekScalarFieldEnum = (typeof TrainingWeekScalarFieldEnum)[keyof typeof TrainingWeekScalarFieldEnum]


  export const TrainingDayScalarFieldEnum: {
    id: 'id',
    date: 'date',
    dayLabel: 'dayLabel',
    dayNumber: 'dayNumber',
    weekId: 'weekId'
  };

  export type TrainingDayScalarFieldEnum = (typeof TrainingDayScalarFieldEnum)[keyof typeof TrainingDayScalarFieldEnum]


  export const ExerciseGroupScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type ExerciseGroupScalarFieldEnum = (typeof ExerciseGroupScalarFieldEnum)[keyof typeof ExerciseGroupScalarFieldEnum]


  export const ExerciseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    exerciseGroupId: 'exerciseGroupId',
    recommendedMinReps: 'recommendedMinReps',
    recommendedMaxReps: 'recommendedMaxReps'
  };

  export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    username: 'username',
    email: 'email',
    password: 'password',
    isocode: 'isocode',
    lastVisitedWeek: 'lastVisitedWeek',
    registrationDate: 'registrationDate',
    hidingDate: 'hidingDate',
    subscriptionAmount: 'subscriptionAmount',
    subscriptionFrequency: 'subscriptionFrequency',
    role: 'role',
    hidden: 'hidden',
    lastOKLogin: 'lastOKLogin',
    lastKOLogin: 'lastKOLogin'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DayExerciseScalarFieldEnum: {
    id: 'id',
    trainingDayId: 'trainingDayId',
    exerciseId: 'exerciseId',
    athleteNotes: 'athleteNotes',
    trainerNotes: 'trainerNotes',
    day: 'day',
    exerciseNumber: 'exerciseNumber'
  };

  export type DayExerciseScalarFieldEnum = (typeof DayExerciseScalarFieldEnum)[keyof typeof DayExerciseScalarFieldEnum]


  export const DayExerciseSeriesScalarFieldEnum: {
    id: 'id',
    dayExerciseId: 'dayExerciseId',
    seriesNumber: 'seriesNumber',
    minReps: 'minReps',
    maxReps: 'maxReps',
    minRir: 'minRir',
    maxRir: 'maxRir',
    effectiveReps: 'effectiveReps',
    effectiveWeight: 'effectiveWeight',
    effectiveRir: 'effectiveRir',
    trainingWeekId: 'trainingWeekId',
    isDropset: 'isDropset'
  };

  export type DayExerciseSeriesScalarFieldEnum = (typeof DayExerciseSeriesScalarFieldEnum)[keyof typeof DayExerciseSeriesScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dueDate: 'dueDate',
    amount: 'amount',
    isPayed: 'isPayed'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    
  /**
   * Deep Input Types
   */


  export type TrainingBlockWhereInput = {
    AND?: TrainingBlockWhereInput | TrainingBlockWhereInput[]
    OR?: TrainingBlockWhereInput[]
    NOT?: TrainingBlockWhereInput | TrainingBlockWhereInput[]
    isVisible?: BoolFilter<"TrainingBlock"> | boolean
    id?: StringFilter<"TrainingBlock"> | string
    blockNumber?: IntFilter<"TrainingBlock"> | number
    description?: StringFilter<"TrainingBlock"> | string
    userId?: StringFilter<"TrainingBlock"> | string
    weeks?: TrainingWeekListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TrainingBlockOrderByWithRelationInput = {
    isVisible?: SortOrder
    id?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    weeks?: TrainingWeekOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type TrainingBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingBlockWhereInput | TrainingBlockWhereInput[]
    OR?: TrainingBlockWhereInput[]
    NOT?: TrainingBlockWhereInput | TrainingBlockWhereInput[]
    isVisible?: BoolFilter<"TrainingBlock"> | boolean
    blockNumber?: IntFilter<"TrainingBlock"> | number
    description?: StringFilter<"TrainingBlock"> | string
    userId?: StringFilter<"TrainingBlock"> | string
    weeks?: TrainingWeekListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TrainingBlockOrderByWithAggregationInput = {
    isVisible?: SortOrder
    id?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    _count?: TrainingBlockCountOrderByAggregateInput
    _avg?: TrainingBlockAvgOrderByAggregateInput
    _max?: TrainingBlockMaxOrderByAggregateInput
    _min?: TrainingBlockMinOrderByAggregateInput
    _sum?: TrainingBlockSumOrderByAggregateInput
  }

  export type TrainingBlockScalarWhereWithAggregatesInput = {
    AND?: TrainingBlockScalarWhereWithAggregatesInput | TrainingBlockScalarWhereWithAggregatesInput[]
    OR?: TrainingBlockScalarWhereWithAggregatesInput[]
    NOT?: TrainingBlockScalarWhereWithAggregatesInput | TrainingBlockScalarWhereWithAggregatesInput[]
    isVisible?: BoolWithAggregatesFilter<"TrainingBlock"> | boolean
    id?: StringWithAggregatesFilter<"TrainingBlock"> | string
    blockNumber?: IntWithAggregatesFilter<"TrainingBlock"> | number
    description?: StringWithAggregatesFilter<"TrainingBlock"> | string
    userId?: StringWithAggregatesFilter<"TrainingBlock"> | string
  }

  export type TrainingWeekWhereInput = {
    AND?: TrainingWeekWhereInput | TrainingWeekWhereInput[]
    OR?: TrainingWeekWhereInput[]
    NOT?: TrainingWeekWhereInput | TrainingWeekWhereInput[]
    id?: StringFilter<"TrainingWeek"> | string
    blockId?: StringFilter<"TrainingWeek"> | string
    weekNumber?: IntFilter<"TrainingWeek"> | number
    weekStart?: DateTimeFilter<"TrainingWeek"> | Date | string
    weekEnd?: DateTimeFilter<"TrainingWeek"> | Date | string
    block?: XOR<TrainingBlockScalarRelationFilter, TrainingBlockWhereInput>
    trainingDays?: TrainingDayListRelationFilter
    dayExerciseSeries?: DayExerciseSeriesListRelationFilter
  }

  export type TrainingWeekOrderByWithRelationInput = {
    id?: SortOrder
    blockId?: SortOrder
    weekNumber?: SortOrder
    weekStart?: SortOrder
    weekEnd?: SortOrder
    block?: TrainingBlockOrderByWithRelationInput
    trainingDays?: TrainingDayOrderByRelationAggregateInput
    dayExerciseSeries?: DayExerciseSeriesOrderByRelationAggregateInput
  }

  export type TrainingWeekWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingWeekWhereInput | TrainingWeekWhereInput[]
    OR?: TrainingWeekWhereInput[]
    NOT?: TrainingWeekWhereInput | TrainingWeekWhereInput[]
    blockId?: StringFilter<"TrainingWeek"> | string
    weekNumber?: IntFilter<"TrainingWeek"> | number
    weekStart?: DateTimeFilter<"TrainingWeek"> | Date | string
    weekEnd?: DateTimeFilter<"TrainingWeek"> | Date | string
    block?: XOR<TrainingBlockScalarRelationFilter, TrainingBlockWhereInput>
    trainingDays?: TrainingDayListRelationFilter
    dayExerciseSeries?: DayExerciseSeriesListRelationFilter
  }, "id">

  export type TrainingWeekOrderByWithAggregationInput = {
    id?: SortOrder
    blockId?: SortOrder
    weekNumber?: SortOrder
    weekStart?: SortOrder
    weekEnd?: SortOrder
    _count?: TrainingWeekCountOrderByAggregateInput
    _avg?: TrainingWeekAvgOrderByAggregateInput
    _max?: TrainingWeekMaxOrderByAggregateInput
    _min?: TrainingWeekMinOrderByAggregateInput
    _sum?: TrainingWeekSumOrderByAggregateInput
  }

  export type TrainingWeekScalarWhereWithAggregatesInput = {
    AND?: TrainingWeekScalarWhereWithAggregatesInput | TrainingWeekScalarWhereWithAggregatesInput[]
    OR?: TrainingWeekScalarWhereWithAggregatesInput[]
    NOT?: TrainingWeekScalarWhereWithAggregatesInput | TrainingWeekScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingWeek"> | string
    blockId?: StringWithAggregatesFilter<"TrainingWeek"> | string
    weekNumber?: IntWithAggregatesFilter<"TrainingWeek"> | number
    weekStart?: DateTimeWithAggregatesFilter<"TrainingWeek"> | Date | string
    weekEnd?: DateTimeWithAggregatesFilter<"TrainingWeek"> | Date | string
  }

  export type TrainingDayWhereInput = {
    AND?: TrainingDayWhereInput | TrainingDayWhereInput[]
    OR?: TrainingDayWhereInput[]
    NOT?: TrainingDayWhereInput | TrainingDayWhereInput[]
    id?: StringFilter<"TrainingDay"> | string
    date?: DateTimeFilter<"TrainingDay"> | Date | string
    dayLabel?: StringFilter<"TrainingDay"> | string
    dayNumber?: IntFilter<"TrainingDay"> | number
    weekId?: StringFilter<"TrainingDay"> | string
    week?: XOR<TrainingWeekScalarRelationFilter, TrainingWeekWhereInput>
    dayExercises?: DayExerciseListRelationFilter
  }

  export type TrainingDayOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    dayLabel?: SortOrder
    dayNumber?: SortOrder
    weekId?: SortOrder
    week?: TrainingWeekOrderByWithRelationInput
    dayExercises?: DayExerciseOrderByRelationAggregateInput
  }

  export type TrainingDayWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingDayWhereInput | TrainingDayWhereInput[]
    OR?: TrainingDayWhereInput[]
    NOT?: TrainingDayWhereInput | TrainingDayWhereInput[]
    date?: DateTimeFilter<"TrainingDay"> | Date | string
    dayLabel?: StringFilter<"TrainingDay"> | string
    dayNumber?: IntFilter<"TrainingDay"> | number
    weekId?: StringFilter<"TrainingDay"> | string
    week?: XOR<TrainingWeekScalarRelationFilter, TrainingWeekWhereInput>
    dayExercises?: DayExerciseListRelationFilter
  }, "id">

  export type TrainingDayOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    dayLabel?: SortOrder
    dayNumber?: SortOrder
    weekId?: SortOrder
    _count?: TrainingDayCountOrderByAggregateInput
    _avg?: TrainingDayAvgOrderByAggregateInput
    _max?: TrainingDayMaxOrderByAggregateInput
    _min?: TrainingDayMinOrderByAggregateInput
    _sum?: TrainingDaySumOrderByAggregateInput
  }

  export type TrainingDayScalarWhereWithAggregatesInput = {
    AND?: TrainingDayScalarWhereWithAggregatesInput | TrainingDayScalarWhereWithAggregatesInput[]
    OR?: TrainingDayScalarWhereWithAggregatesInput[]
    NOT?: TrainingDayScalarWhereWithAggregatesInput | TrainingDayScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingDay"> | string
    date?: DateTimeWithAggregatesFilter<"TrainingDay"> | Date | string
    dayLabel?: StringWithAggregatesFilter<"TrainingDay"> | string
    dayNumber?: IntWithAggregatesFilter<"TrainingDay"> | number
    weekId?: StringWithAggregatesFilter<"TrainingDay"> | string
  }

  export type ExerciseGroupWhereInput = {
    AND?: ExerciseGroupWhereInput | ExerciseGroupWhereInput[]
    OR?: ExerciseGroupWhereInput[]
    NOT?: ExerciseGroupWhereInput | ExerciseGroupWhereInput[]
    id?: StringFilter<"ExerciseGroup"> | string
    name?: StringFilter<"ExerciseGroup"> | string
    exercises?: ExerciseListRelationFilter
  }

  export type ExerciseGroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    exercises?: ExerciseOrderByRelationAggregateInput
  }

  export type ExerciseGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ExerciseGroupWhereInput | ExerciseGroupWhereInput[]
    OR?: ExerciseGroupWhereInput[]
    NOT?: ExerciseGroupWhereInput | ExerciseGroupWhereInput[]
    exercises?: ExerciseListRelationFilter
  }, "id" | "name">

  export type ExerciseGroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: ExerciseGroupCountOrderByAggregateInput
    _max?: ExerciseGroupMaxOrderByAggregateInput
    _min?: ExerciseGroupMinOrderByAggregateInput
  }

  export type ExerciseGroupScalarWhereWithAggregatesInput = {
    AND?: ExerciseGroupScalarWhereWithAggregatesInput | ExerciseGroupScalarWhereWithAggregatesInput[]
    OR?: ExerciseGroupScalarWhereWithAggregatesInput[]
    NOT?: ExerciseGroupScalarWhereWithAggregatesInput | ExerciseGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExerciseGroup"> | string
    name?: StringWithAggregatesFilter<"ExerciseGroup"> | string
  }

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    id?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    exerciseGroupId?: StringFilter<"Exercise"> | string
    recommendedMinReps?: IntNullableFilter<"Exercise"> | number | null
    recommendedMaxReps?: IntNullableFilter<"Exercise"> | number | null
    exerciseGroup?: XOR<ExerciseGroupScalarRelationFilter, ExerciseGroupWhereInput>
    dayExercises?: DayExerciseListRelationFilter
  }

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    exerciseGroupId?: SortOrder
    recommendedMinReps?: SortOrderInput | SortOrder
    recommendedMaxReps?: SortOrderInput | SortOrder
    exerciseGroup?: ExerciseGroupOrderByWithRelationInput
    dayExercises?: DayExerciseOrderByRelationAggregateInput
  }

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    exerciseGroupId?: StringFilter<"Exercise"> | string
    recommendedMinReps?: IntNullableFilter<"Exercise"> | number | null
    recommendedMaxReps?: IntNullableFilter<"Exercise"> | number | null
    exerciseGroup?: XOR<ExerciseGroupScalarRelationFilter, ExerciseGroupWhereInput>
    dayExercises?: DayExerciseListRelationFilter
  }, "id" | "name">

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    exerciseGroupId?: SortOrder
    recommendedMinReps?: SortOrderInput | SortOrder
    recommendedMaxReps?: SortOrderInput | SortOrder
    _count?: ExerciseCountOrderByAggregateInput
    _avg?: ExerciseAvgOrderByAggregateInput
    _max?: ExerciseMaxOrderByAggregateInput
    _min?: ExerciseMinOrderByAggregateInput
    _sum?: ExerciseSumOrderByAggregateInput
  }

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    OR?: ExerciseScalarWhereWithAggregatesInput[]
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exercise"> | string
    name?: StringWithAggregatesFilter<"Exercise"> | string
    exerciseGroupId?: StringWithAggregatesFilter<"Exercise"> | string
    recommendedMinReps?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    recommendedMaxReps?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    isocode?: StringNullableFilter<"User"> | string | null
    lastVisitedWeek?: StringNullableFilter<"User"> | string | null
    registrationDate?: DateTimeFilter<"User"> | Date | string
    hidingDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionAmount?: FloatNullableFilter<"User"> | number | null
    subscriptionFrequency?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    hidden?: BoolFilter<"User"> | boolean
    lastOKLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    lastKOLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    blocks?: TrainingBlockListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    isocode?: SortOrderInput | SortOrder
    lastVisitedWeek?: SortOrderInput | SortOrder
    registrationDate?: SortOrder
    hidingDate?: SortOrderInput | SortOrder
    subscriptionAmount?: SortOrderInput | SortOrder
    subscriptionFrequency?: SortOrderInput | SortOrder
    role?: SortOrder
    hidden?: SortOrder
    lastOKLogin?: SortOrderInput | SortOrder
    lastKOLogin?: SortOrderInput | SortOrder
    blocks?: TrainingBlockOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    isocode?: StringNullableFilter<"User"> | string | null
    lastVisitedWeek?: StringNullableFilter<"User"> | string | null
    registrationDate?: DateTimeFilter<"User"> | Date | string
    hidingDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionAmount?: FloatNullableFilter<"User"> | number | null
    subscriptionFrequency?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    hidden?: BoolFilter<"User"> | boolean
    lastOKLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    lastKOLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    blocks?: TrainingBlockListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    isocode?: SortOrderInput | SortOrder
    lastVisitedWeek?: SortOrderInput | SortOrder
    registrationDate?: SortOrder
    hidingDate?: SortOrderInput | SortOrder
    subscriptionAmount?: SortOrderInput | SortOrder
    subscriptionFrequency?: SortOrderInput | SortOrder
    role?: SortOrder
    hidden?: SortOrder
    lastOKLogin?: SortOrderInput | SortOrder
    lastKOLogin?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    isocode?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastVisitedWeek?: StringNullableWithAggregatesFilter<"User"> | string | null
    registrationDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    hidingDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    subscriptionAmount?: FloatNullableWithAggregatesFilter<"User"> | number | null
    subscriptionFrequency?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    hidden?: BoolWithAggregatesFilter<"User"> | boolean
    lastOKLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastKOLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type DayExerciseWhereInput = {
    AND?: DayExerciseWhereInput | DayExerciseWhereInput[]
    OR?: DayExerciseWhereInput[]
    NOT?: DayExerciseWhereInput | DayExerciseWhereInput[]
    id?: StringFilter<"DayExercise"> | string
    trainingDayId?: StringFilter<"DayExercise"> | string
    exerciseId?: StringFilter<"DayExercise"> | string
    athleteNotes?: StringNullableFilter<"DayExercise"> | string | null
    trainerNotes?: StringNullableFilter<"DayExercise"> | string | null
    day?: StringFilter<"DayExercise"> | string
    exerciseNumber?: IntNullableFilter<"DayExercise"> | number | null
    trainingDay?: XOR<TrainingDayScalarRelationFilter, TrainingDayWhereInput>
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
    series?: DayExerciseSeriesListRelationFilter
  }

  export type DayExerciseOrderByWithRelationInput = {
    id?: SortOrder
    trainingDayId?: SortOrder
    exerciseId?: SortOrder
    athleteNotes?: SortOrderInput | SortOrder
    trainerNotes?: SortOrderInput | SortOrder
    day?: SortOrder
    exerciseNumber?: SortOrderInput | SortOrder
    trainingDay?: TrainingDayOrderByWithRelationInput
    exercise?: ExerciseOrderByWithRelationInput
    series?: DayExerciseSeriesOrderByRelationAggregateInput
  }

  export type DayExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DayExerciseWhereInput | DayExerciseWhereInput[]
    OR?: DayExerciseWhereInput[]
    NOT?: DayExerciseWhereInput | DayExerciseWhereInput[]
    trainingDayId?: StringFilter<"DayExercise"> | string
    exerciseId?: StringFilter<"DayExercise"> | string
    athleteNotes?: StringNullableFilter<"DayExercise"> | string | null
    trainerNotes?: StringNullableFilter<"DayExercise"> | string | null
    day?: StringFilter<"DayExercise"> | string
    exerciseNumber?: IntNullableFilter<"DayExercise"> | number | null
    trainingDay?: XOR<TrainingDayScalarRelationFilter, TrainingDayWhereInput>
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
    series?: DayExerciseSeriesListRelationFilter
  }, "id">

  export type DayExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    trainingDayId?: SortOrder
    exerciseId?: SortOrder
    athleteNotes?: SortOrderInput | SortOrder
    trainerNotes?: SortOrderInput | SortOrder
    day?: SortOrder
    exerciseNumber?: SortOrderInput | SortOrder
    _count?: DayExerciseCountOrderByAggregateInput
    _avg?: DayExerciseAvgOrderByAggregateInput
    _max?: DayExerciseMaxOrderByAggregateInput
    _min?: DayExerciseMinOrderByAggregateInput
    _sum?: DayExerciseSumOrderByAggregateInput
  }

  export type DayExerciseScalarWhereWithAggregatesInput = {
    AND?: DayExerciseScalarWhereWithAggregatesInput | DayExerciseScalarWhereWithAggregatesInput[]
    OR?: DayExerciseScalarWhereWithAggregatesInput[]
    NOT?: DayExerciseScalarWhereWithAggregatesInput | DayExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DayExercise"> | string
    trainingDayId?: StringWithAggregatesFilter<"DayExercise"> | string
    exerciseId?: StringWithAggregatesFilter<"DayExercise"> | string
    athleteNotes?: StringNullableWithAggregatesFilter<"DayExercise"> | string | null
    trainerNotes?: StringNullableWithAggregatesFilter<"DayExercise"> | string | null
    day?: StringWithAggregatesFilter<"DayExercise"> | string
    exerciseNumber?: IntNullableWithAggregatesFilter<"DayExercise"> | number | null
  }

  export type DayExerciseSeriesWhereInput = {
    AND?: DayExerciseSeriesWhereInput | DayExerciseSeriesWhereInput[]
    OR?: DayExerciseSeriesWhereInput[]
    NOT?: DayExerciseSeriesWhereInput | DayExerciseSeriesWhereInput[]
    id?: StringFilter<"DayExerciseSeries"> | string
    dayExerciseId?: StringFilter<"DayExerciseSeries"> | string
    seriesNumber?: IntFilter<"DayExerciseSeries"> | number
    minReps?: IntFilter<"DayExerciseSeries"> | number
    maxReps?: IntFilter<"DayExerciseSeries"> | number
    minRir?: IntFilter<"DayExerciseSeries"> | number
    maxRir?: IntFilter<"DayExerciseSeries"> | number
    effectiveReps?: IntNullableFilter<"DayExerciseSeries"> | number | null
    effectiveWeight?: FloatNullableFilter<"DayExerciseSeries"> | number | null
    effectiveRir?: IntNullableFilter<"DayExerciseSeries"> | number | null
    trainingWeekId?: StringFilter<"DayExerciseSeries"> | string
    isDropset?: BoolFilter<"DayExerciseSeries"> | boolean
    dayExercise?: XOR<DayExerciseScalarRelationFilter, DayExerciseWhereInput>
    trainingWeek?: XOR<TrainingWeekScalarRelationFilter, TrainingWeekWhereInput>
  }

  export type DayExerciseSeriesOrderByWithRelationInput = {
    id?: SortOrder
    dayExerciseId?: SortOrder
    seriesNumber?: SortOrder
    minReps?: SortOrder
    maxReps?: SortOrder
    minRir?: SortOrder
    maxRir?: SortOrder
    effectiveReps?: SortOrderInput | SortOrder
    effectiveWeight?: SortOrderInput | SortOrder
    effectiveRir?: SortOrderInput | SortOrder
    trainingWeekId?: SortOrder
    isDropset?: SortOrder
    dayExercise?: DayExerciseOrderByWithRelationInput
    trainingWeek?: TrainingWeekOrderByWithRelationInput
  }

  export type DayExerciseSeriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DayExerciseSeriesWhereInput | DayExerciseSeriesWhereInput[]
    OR?: DayExerciseSeriesWhereInput[]
    NOT?: DayExerciseSeriesWhereInput | DayExerciseSeriesWhereInput[]
    dayExerciseId?: StringFilter<"DayExerciseSeries"> | string
    seriesNumber?: IntFilter<"DayExerciseSeries"> | number
    minReps?: IntFilter<"DayExerciseSeries"> | number
    maxReps?: IntFilter<"DayExerciseSeries"> | number
    minRir?: IntFilter<"DayExerciseSeries"> | number
    maxRir?: IntFilter<"DayExerciseSeries"> | number
    effectiveReps?: IntNullableFilter<"DayExerciseSeries"> | number | null
    effectiveWeight?: FloatNullableFilter<"DayExerciseSeries"> | number | null
    effectiveRir?: IntNullableFilter<"DayExerciseSeries"> | number | null
    trainingWeekId?: StringFilter<"DayExerciseSeries"> | string
    isDropset?: BoolFilter<"DayExerciseSeries"> | boolean
    dayExercise?: XOR<DayExerciseScalarRelationFilter, DayExerciseWhereInput>
    trainingWeek?: XOR<TrainingWeekScalarRelationFilter, TrainingWeekWhereInput>
  }, "id">

  export type DayExerciseSeriesOrderByWithAggregationInput = {
    id?: SortOrder
    dayExerciseId?: SortOrder
    seriesNumber?: SortOrder
    minReps?: SortOrder
    maxReps?: SortOrder
    minRir?: SortOrder
    maxRir?: SortOrder
    effectiveReps?: SortOrderInput | SortOrder
    effectiveWeight?: SortOrderInput | SortOrder
    effectiveRir?: SortOrderInput | SortOrder
    trainingWeekId?: SortOrder
    isDropset?: SortOrder
    _count?: DayExerciseSeriesCountOrderByAggregateInput
    _avg?: DayExerciseSeriesAvgOrderByAggregateInput
    _max?: DayExerciseSeriesMaxOrderByAggregateInput
    _min?: DayExerciseSeriesMinOrderByAggregateInput
    _sum?: DayExerciseSeriesSumOrderByAggregateInput
  }

  export type DayExerciseSeriesScalarWhereWithAggregatesInput = {
    AND?: DayExerciseSeriesScalarWhereWithAggregatesInput | DayExerciseSeriesScalarWhereWithAggregatesInput[]
    OR?: DayExerciseSeriesScalarWhereWithAggregatesInput[]
    NOT?: DayExerciseSeriesScalarWhereWithAggregatesInput | DayExerciseSeriesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DayExerciseSeries"> | string
    dayExerciseId?: StringWithAggregatesFilter<"DayExerciseSeries"> | string
    seriesNumber?: IntWithAggregatesFilter<"DayExerciseSeries"> | number
    minReps?: IntWithAggregatesFilter<"DayExerciseSeries"> | number
    maxReps?: IntWithAggregatesFilter<"DayExerciseSeries"> | number
    minRir?: IntWithAggregatesFilter<"DayExerciseSeries"> | number
    maxRir?: IntWithAggregatesFilter<"DayExerciseSeries"> | number
    effectiveReps?: IntNullableWithAggregatesFilter<"DayExerciseSeries"> | number | null
    effectiveWeight?: FloatNullableWithAggregatesFilter<"DayExerciseSeries"> | number | null
    effectiveRir?: IntNullableWithAggregatesFilter<"DayExerciseSeries"> | number | null
    trainingWeekId?: StringWithAggregatesFilter<"DayExerciseSeries"> | string
    isDropset?: BoolWithAggregatesFilter<"DayExerciseSeries"> | boolean
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    amount?: FloatFilter<"Payment"> | number
    isPayed?: BoolFilter<"Payment"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    isPayed?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: StringFilter<"Payment"> | string
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    amount?: FloatFilter<"Payment"> | number
    isPayed?: BoolFilter<"Payment"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    isPayed?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
    dueDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    isPayed?: BoolWithAggregatesFilter<"Payment"> | boolean
  }

  export type TrainingBlockCreateInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
    weeks?: TrainingWeekCreateNestedManyWithoutBlockInput
    user: UserCreateNestedOneWithoutBlocksInput
  }

  export type TrainingBlockUncheckedCreateInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
    userId: string
    weeks?: TrainingWeekUncheckedCreateNestedManyWithoutBlockInput
  }

  export type TrainingBlockUpdateInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    weeks?: TrainingWeekUpdateManyWithoutBlockNestedInput
    user?: UserUpdateOneRequiredWithoutBlocksNestedInput
  }

  export type TrainingBlockUncheckedUpdateInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weeks?: TrainingWeekUncheckedUpdateManyWithoutBlockNestedInput
  }

  export type TrainingBlockCreateManyInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
    userId: string
  }

  export type TrainingBlockUpdateManyMutationInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TrainingBlockUncheckedUpdateManyInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TrainingWeekCreateInput = {
    id?: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    block: TrainingBlockCreateNestedOneWithoutWeeksInput
    trainingDays?: TrainingDayCreateNestedManyWithoutWeekInput
    dayExerciseSeries?: DayExerciseSeriesCreateNestedManyWithoutTrainingWeekInput
  }

  export type TrainingWeekUncheckedCreateInput = {
    id?: string
    blockId: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    trainingDays?: TrainingDayUncheckedCreateNestedManyWithoutWeekInput
    dayExerciseSeries?: DayExerciseSeriesUncheckedCreateNestedManyWithoutTrainingWeekInput
  }

  export type TrainingWeekUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    block?: TrainingBlockUpdateOneRequiredWithoutWeeksNestedInput
    trainingDays?: TrainingDayUpdateManyWithoutWeekNestedInput
    dayExerciseSeries?: DayExerciseSeriesUpdateManyWithoutTrainingWeekNestedInput
  }

  export type TrainingWeekUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingDays?: TrainingDayUncheckedUpdateManyWithoutWeekNestedInput
    dayExerciseSeries?: DayExerciseSeriesUncheckedUpdateManyWithoutTrainingWeekNestedInput
  }

  export type TrainingWeekCreateManyInput = {
    id?: string
    blockId: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
  }

  export type TrainingWeekUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingWeekUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingDayCreateInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
    week: TrainingWeekCreateNestedOneWithoutTrainingDaysInput
    dayExercises?: DayExerciseCreateNestedManyWithoutTrainingDayInput
  }

  export type TrainingDayUncheckedCreateInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
    weekId: string
    dayExercises?: DayExerciseUncheckedCreateNestedManyWithoutTrainingDayInput
  }

  export type TrainingDayUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    week?: TrainingWeekUpdateOneRequiredWithoutTrainingDaysNestedInput
    dayExercises?: DayExerciseUpdateManyWithoutTrainingDayNestedInput
  }

  export type TrainingDayUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    weekId?: StringFieldUpdateOperationsInput | string
    dayExercises?: DayExerciseUncheckedUpdateManyWithoutTrainingDayNestedInput
  }

  export type TrainingDayCreateManyInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
    weekId: string
  }

  export type TrainingDayUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type TrainingDayUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    weekId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseGroupCreateInput = {
    id?: string
    name: string
    exercises?: ExerciseCreateNestedManyWithoutExerciseGroupInput
  }

  export type ExerciseGroupUncheckedCreateInput = {
    id?: string
    name: string
    exercises?: ExerciseUncheckedCreateNestedManyWithoutExerciseGroupInput
  }

  export type ExerciseGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: ExerciseUpdateManyWithoutExerciseGroupNestedInput
  }

  export type ExerciseGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: ExerciseUncheckedUpdateManyWithoutExerciseGroupNestedInput
  }

  export type ExerciseGroupCreateManyInput = {
    id?: string
    name: string
  }

  export type ExerciseGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseCreateInput = {
    id?: string
    name: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
    exerciseGroup: ExerciseGroupCreateNestedOneWithoutExercisesInput
    dayExercises?: DayExerciseCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateInput = {
    id?: string
    name: string
    exerciseGroupId: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
    dayExercises?: DayExerciseUncheckedCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
    exerciseGroup?: ExerciseGroupUpdateOneRequiredWithoutExercisesNestedInput
    dayExercises?: DayExerciseUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseGroupId?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
    dayExercises?: DayExerciseUncheckedUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseCreateManyInput = {
    id?: string
    name: string
    exerciseGroupId: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
  }

  export type ExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseGroupId?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    username: string
    email: string
    password?: string | null
    isocode?: string | null
    lastVisitedWeek?: string | null
    registrationDate?: Date | string
    hidingDate?: Date | string | null
    subscriptionAmount?: number | null
    subscriptionFrequency?: string | null
    role?: $Enums.Role
    hidden?: boolean
    lastOKLogin?: Date | string | null
    lastKOLogin?: Date | string | null
    blocks?: TrainingBlockCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    username: string
    email: string
    password?: string | null
    isocode?: string | null
    lastVisitedWeek?: string | null
    registrationDate?: Date | string
    hidingDate?: Date | string | null
    subscriptionAmount?: number | null
    subscriptionFrequency?: string | null
    role?: $Enums.Role
    hidden?: boolean
    lastOKLogin?: Date | string | null
    lastKOLogin?: Date | string | null
    blocks?: TrainingBlockUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blocks?: TrainingBlockUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blocks?: TrainingBlockUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    username: string
    email: string
    password?: string | null
    isocode?: string | null
    lastVisitedWeek?: string | null
    registrationDate?: Date | string
    hidingDate?: Date | string | null
    subscriptionAmount?: number | null
    subscriptionFrequency?: string | null
    role?: $Enums.Role
    hidden?: boolean
    lastOKLogin?: Date | string | null
    lastKOLogin?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DayExerciseCreateInput = {
    id?: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
    trainingDay: TrainingDayCreateNestedOneWithoutDayExercisesInput
    exercise: ExerciseCreateNestedOneWithoutDayExercisesInput
    series?: DayExerciseSeriesCreateNestedManyWithoutDayExerciseInput
  }

  export type DayExerciseUncheckedCreateInput = {
    id?: string
    trainingDayId: string
    exerciseId: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
    series?: DayExerciseSeriesUncheckedCreateNestedManyWithoutDayExerciseInput
  }

  export type DayExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
    trainingDay?: TrainingDayUpdateOneRequiredWithoutDayExercisesNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutDayExercisesNestedInput
    series?: DayExerciseSeriesUpdateManyWithoutDayExerciseNestedInput
  }

  export type DayExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingDayId?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
    series?: DayExerciseSeriesUncheckedUpdateManyWithoutDayExerciseNestedInput
  }

  export type DayExerciseCreateManyInput = {
    id?: string
    trainingDayId: string
    exerciseId: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
  }

  export type DayExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DayExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingDayId?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DayExerciseSeriesCreateInput = {
    id?: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    isDropset?: boolean
    dayExercise: DayExerciseCreateNestedOneWithoutSeriesInput
    trainingWeek: TrainingWeekCreateNestedOneWithoutDayExerciseSeriesInput
  }

  export type DayExerciseSeriesUncheckedCreateInput = {
    id?: string
    dayExerciseId: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    trainingWeekId: string
    isDropset?: boolean
  }

  export type DayExerciseSeriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    isDropset?: BoolFieldUpdateOperationsInput | boolean
    dayExercise?: DayExerciseUpdateOneRequiredWithoutSeriesNestedInput
    trainingWeek?: TrainingWeekUpdateOneRequiredWithoutDayExerciseSeriesNestedInput
  }

  export type DayExerciseSeriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayExerciseId?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    trainingWeekId?: StringFieldUpdateOperationsInput | string
    isDropset?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DayExerciseSeriesCreateManyInput = {
    id?: string
    dayExerciseId: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    trainingWeekId: string
    isDropset?: boolean
  }

  export type DayExerciseSeriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    isDropset?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DayExerciseSeriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayExerciseId?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    trainingWeekId?: StringFieldUpdateOperationsInput | string
    isDropset?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentCreateInput = {
    id?: string
    dueDate: Date | string
    amount: number
    isPayed?: boolean
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    userId: string
    dueDate: Date | string
    amount: number
    isPayed?: boolean
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    isPayed?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    isPayed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentCreateManyInput = {
    id?: string
    userId: string
    dueDate: Date | string
    amount: number
    isPayed?: boolean
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    isPayed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    isPayed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TrainingWeekListRelationFilter = {
    every?: TrainingWeekWhereInput
    some?: TrainingWeekWhereInput
    none?: TrainingWeekWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TrainingWeekOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingBlockCountOrderByAggregateInput = {
    isVisible?: SortOrder
    id?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    userId?: SortOrder
  }

  export type TrainingBlockAvgOrderByAggregateInput = {
    blockNumber?: SortOrder
  }

  export type TrainingBlockMaxOrderByAggregateInput = {
    isVisible?: SortOrder
    id?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    userId?: SortOrder
  }

  export type TrainingBlockMinOrderByAggregateInput = {
    isVisible?: SortOrder
    id?: SortOrder
    blockNumber?: SortOrder
    description?: SortOrder
    userId?: SortOrder
  }

  export type TrainingBlockSumOrderByAggregateInput = {
    blockNumber?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TrainingBlockScalarRelationFilter = {
    is?: TrainingBlockWhereInput
    isNot?: TrainingBlockWhereInput
  }

  export type TrainingDayListRelationFilter = {
    every?: TrainingDayWhereInput
    some?: TrainingDayWhereInput
    none?: TrainingDayWhereInput
  }

  export type DayExerciseSeriesListRelationFilter = {
    every?: DayExerciseSeriesWhereInput
    some?: DayExerciseSeriesWhereInput
    none?: DayExerciseSeriesWhereInput
  }

  export type TrainingDayOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DayExerciseSeriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingWeekCountOrderByAggregateInput = {
    id?: SortOrder
    blockId?: SortOrder
    weekNumber?: SortOrder
    weekStart?: SortOrder
    weekEnd?: SortOrder
  }

  export type TrainingWeekAvgOrderByAggregateInput = {
    weekNumber?: SortOrder
  }

  export type TrainingWeekMaxOrderByAggregateInput = {
    id?: SortOrder
    blockId?: SortOrder
    weekNumber?: SortOrder
    weekStart?: SortOrder
    weekEnd?: SortOrder
  }

  export type TrainingWeekMinOrderByAggregateInput = {
    id?: SortOrder
    blockId?: SortOrder
    weekNumber?: SortOrder
    weekStart?: SortOrder
    weekEnd?: SortOrder
  }

  export type TrainingWeekSumOrderByAggregateInput = {
    weekNumber?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TrainingWeekScalarRelationFilter = {
    is?: TrainingWeekWhereInput
    isNot?: TrainingWeekWhereInput
  }

  export type DayExerciseListRelationFilter = {
    every?: DayExerciseWhereInput
    some?: DayExerciseWhereInput
    none?: DayExerciseWhereInput
  }

  export type DayExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingDayCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    dayLabel?: SortOrder
    dayNumber?: SortOrder
    weekId?: SortOrder
  }

  export type TrainingDayAvgOrderByAggregateInput = {
    dayNumber?: SortOrder
  }

  export type TrainingDayMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    dayLabel?: SortOrder
    dayNumber?: SortOrder
    weekId?: SortOrder
  }

  export type TrainingDayMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    dayLabel?: SortOrder
    dayNumber?: SortOrder
    weekId?: SortOrder
  }

  export type TrainingDaySumOrderByAggregateInput = {
    dayNumber?: SortOrder
  }

  export type ExerciseListRelationFilter = {
    every?: ExerciseWhereInput
    some?: ExerciseWhereInput
    none?: ExerciseWhereInput
  }

  export type ExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExerciseGroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ExerciseGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ExerciseGroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ExerciseGroupScalarRelationFilter = {
    is?: ExerciseGroupWhereInput
    isNot?: ExerciseGroupWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    exerciseGroupId?: SortOrder
    recommendedMinReps?: SortOrder
    recommendedMaxReps?: SortOrder
  }

  export type ExerciseAvgOrderByAggregateInput = {
    recommendedMinReps?: SortOrder
    recommendedMaxReps?: SortOrder
  }

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    exerciseGroupId?: SortOrder
    recommendedMinReps?: SortOrder
    recommendedMaxReps?: SortOrder
  }

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    exerciseGroupId?: SortOrder
    recommendedMinReps?: SortOrder
    recommendedMaxReps?: SortOrder
  }

  export type ExerciseSumOrderByAggregateInput = {
    recommendedMinReps?: SortOrder
    recommendedMaxReps?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type TrainingBlockListRelationFilter = {
    every?: TrainingBlockWhereInput
    some?: TrainingBlockWhereInput
    none?: TrainingBlockWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type TrainingBlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isocode?: SortOrder
    lastVisitedWeek?: SortOrder
    registrationDate?: SortOrder
    hidingDate?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionFrequency?: SortOrder
    role?: SortOrder
    hidden?: SortOrder
    lastOKLogin?: SortOrder
    lastKOLogin?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    subscriptionAmount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isocode?: SortOrder
    lastVisitedWeek?: SortOrder
    registrationDate?: SortOrder
    hidingDate?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionFrequency?: SortOrder
    role?: SortOrder
    hidden?: SortOrder
    lastOKLogin?: SortOrder
    lastKOLogin?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isocode?: SortOrder
    lastVisitedWeek?: SortOrder
    registrationDate?: SortOrder
    hidingDate?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionFrequency?: SortOrder
    role?: SortOrder
    hidden?: SortOrder
    lastOKLogin?: SortOrder
    lastKOLogin?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    subscriptionAmount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type TrainingDayScalarRelationFilter = {
    is?: TrainingDayWhereInput
    isNot?: TrainingDayWhereInput
  }

  export type ExerciseScalarRelationFilter = {
    is?: ExerciseWhereInput
    isNot?: ExerciseWhereInput
  }

  export type DayExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    trainingDayId?: SortOrder
    exerciseId?: SortOrder
    athleteNotes?: SortOrder
    trainerNotes?: SortOrder
    day?: SortOrder
    exerciseNumber?: SortOrder
  }

  export type DayExerciseAvgOrderByAggregateInput = {
    exerciseNumber?: SortOrder
  }

  export type DayExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    trainingDayId?: SortOrder
    exerciseId?: SortOrder
    athleteNotes?: SortOrder
    trainerNotes?: SortOrder
    day?: SortOrder
    exerciseNumber?: SortOrder
  }

  export type DayExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    trainingDayId?: SortOrder
    exerciseId?: SortOrder
    athleteNotes?: SortOrder
    trainerNotes?: SortOrder
    day?: SortOrder
    exerciseNumber?: SortOrder
  }

  export type DayExerciseSumOrderByAggregateInput = {
    exerciseNumber?: SortOrder
  }

  export type DayExerciseScalarRelationFilter = {
    is?: DayExerciseWhereInput
    isNot?: DayExerciseWhereInput
  }

  export type DayExerciseSeriesCountOrderByAggregateInput = {
    id?: SortOrder
    dayExerciseId?: SortOrder
    seriesNumber?: SortOrder
    minReps?: SortOrder
    maxReps?: SortOrder
    minRir?: SortOrder
    maxRir?: SortOrder
    effectiveReps?: SortOrder
    effectiveWeight?: SortOrder
    effectiveRir?: SortOrder
    trainingWeekId?: SortOrder
    isDropset?: SortOrder
  }

  export type DayExerciseSeriesAvgOrderByAggregateInput = {
    seriesNumber?: SortOrder
    minReps?: SortOrder
    maxReps?: SortOrder
    minRir?: SortOrder
    maxRir?: SortOrder
    effectiveReps?: SortOrder
    effectiveWeight?: SortOrder
    effectiveRir?: SortOrder
  }

  export type DayExerciseSeriesMaxOrderByAggregateInput = {
    id?: SortOrder
    dayExerciseId?: SortOrder
    seriesNumber?: SortOrder
    minReps?: SortOrder
    maxReps?: SortOrder
    minRir?: SortOrder
    maxRir?: SortOrder
    effectiveReps?: SortOrder
    effectiveWeight?: SortOrder
    effectiveRir?: SortOrder
    trainingWeekId?: SortOrder
    isDropset?: SortOrder
  }

  export type DayExerciseSeriesMinOrderByAggregateInput = {
    id?: SortOrder
    dayExerciseId?: SortOrder
    seriesNumber?: SortOrder
    minReps?: SortOrder
    maxReps?: SortOrder
    minRir?: SortOrder
    maxRir?: SortOrder
    effectiveReps?: SortOrder
    effectiveWeight?: SortOrder
    effectiveRir?: SortOrder
    trainingWeekId?: SortOrder
    isDropset?: SortOrder
  }

  export type DayExerciseSeriesSumOrderByAggregateInput = {
    seriesNumber?: SortOrder
    minReps?: SortOrder
    maxReps?: SortOrder
    minRir?: SortOrder
    maxRir?: SortOrder
    effectiveReps?: SortOrder
    effectiveWeight?: SortOrder
    effectiveRir?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    isPayed?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    isPayed?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dueDate?: SortOrder
    amount?: SortOrder
    isPayed?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TrainingWeekCreateNestedManyWithoutBlockInput = {
    create?: XOR<TrainingWeekCreateWithoutBlockInput, TrainingWeekUncheckedCreateWithoutBlockInput> | TrainingWeekCreateWithoutBlockInput[] | TrainingWeekUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutBlockInput | TrainingWeekCreateOrConnectWithoutBlockInput[]
    createMany?: TrainingWeekCreateManyBlockInputEnvelope
    connect?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutBlocksInput = {
    create?: XOR<UserCreateWithoutBlocksInput, UserUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocksInput
    connect?: UserWhereUniqueInput
  }

  export type TrainingWeekUncheckedCreateNestedManyWithoutBlockInput = {
    create?: XOR<TrainingWeekCreateWithoutBlockInput, TrainingWeekUncheckedCreateWithoutBlockInput> | TrainingWeekCreateWithoutBlockInput[] | TrainingWeekUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutBlockInput | TrainingWeekCreateOrConnectWithoutBlockInput[]
    createMany?: TrainingWeekCreateManyBlockInputEnvelope
    connect?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TrainingWeekUpdateManyWithoutBlockNestedInput = {
    create?: XOR<TrainingWeekCreateWithoutBlockInput, TrainingWeekUncheckedCreateWithoutBlockInput> | TrainingWeekCreateWithoutBlockInput[] | TrainingWeekUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutBlockInput | TrainingWeekCreateOrConnectWithoutBlockInput[]
    upsert?: TrainingWeekUpsertWithWhereUniqueWithoutBlockInput | TrainingWeekUpsertWithWhereUniqueWithoutBlockInput[]
    createMany?: TrainingWeekCreateManyBlockInputEnvelope
    set?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    disconnect?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    delete?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    connect?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    update?: TrainingWeekUpdateWithWhereUniqueWithoutBlockInput | TrainingWeekUpdateWithWhereUniqueWithoutBlockInput[]
    updateMany?: TrainingWeekUpdateManyWithWhereWithoutBlockInput | TrainingWeekUpdateManyWithWhereWithoutBlockInput[]
    deleteMany?: TrainingWeekScalarWhereInput | TrainingWeekScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutBlocksNestedInput = {
    create?: XOR<UserCreateWithoutBlocksInput, UserUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocksInput
    upsert?: UserUpsertWithoutBlocksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBlocksInput, UserUpdateWithoutBlocksInput>, UserUncheckedUpdateWithoutBlocksInput>
  }

  export type TrainingWeekUncheckedUpdateManyWithoutBlockNestedInput = {
    create?: XOR<TrainingWeekCreateWithoutBlockInput, TrainingWeekUncheckedCreateWithoutBlockInput> | TrainingWeekCreateWithoutBlockInput[] | TrainingWeekUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutBlockInput | TrainingWeekCreateOrConnectWithoutBlockInput[]
    upsert?: TrainingWeekUpsertWithWhereUniqueWithoutBlockInput | TrainingWeekUpsertWithWhereUniqueWithoutBlockInput[]
    createMany?: TrainingWeekCreateManyBlockInputEnvelope
    set?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    disconnect?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    delete?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    connect?: TrainingWeekWhereUniqueInput | TrainingWeekWhereUniqueInput[]
    update?: TrainingWeekUpdateWithWhereUniqueWithoutBlockInput | TrainingWeekUpdateWithWhereUniqueWithoutBlockInput[]
    updateMany?: TrainingWeekUpdateManyWithWhereWithoutBlockInput | TrainingWeekUpdateManyWithWhereWithoutBlockInput[]
    deleteMany?: TrainingWeekScalarWhereInput | TrainingWeekScalarWhereInput[]
  }

  export type TrainingBlockCreateNestedOneWithoutWeeksInput = {
    create?: XOR<TrainingBlockCreateWithoutWeeksInput, TrainingBlockUncheckedCreateWithoutWeeksInput>
    connectOrCreate?: TrainingBlockCreateOrConnectWithoutWeeksInput
    connect?: TrainingBlockWhereUniqueInput
  }

  export type TrainingDayCreateNestedManyWithoutWeekInput = {
    create?: XOR<TrainingDayCreateWithoutWeekInput, TrainingDayUncheckedCreateWithoutWeekInput> | TrainingDayCreateWithoutWeekInput[] | TrainingDayUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: TrainingDayCreateOrConnectWithoutWeekInput | TrainingDayCreateOrConnectWithoutWeekInput[]
    createMany?: TrainingDayCreateManyWeekInputEnvelope
    connect?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
  }

  export type DayExerciseSeriesCreateNestedManyWithoutTrainingWeekInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput> | DayExerciseSeriesCreateWithoutTrainingWeekInput[] | DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput | DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput[]
    createMany?: DayExerciseSeriesCreateManyTrainingWeekInputEnvelope
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
  }

  export type TrainingDayUncheckedCreateNestedManyWithoutWeekInput = {
    create?: XOR<TrainingDayCreateWithoutWeekInput, TrainingDayUncheckedCreateWithoutWeekInput> | TrainingDayCreateWithoutWeekInput[] | TrainingDayUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: TrainingDayCreateOrConnectWithoutWeekInput | TrainingDayCreateOrConnectWithoutWeekInput[]
    createMany?: TrainingDayCreateManyWeekInputEnvelope
    connect?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
  }

  export type DayExerciseSeriesUncheckedCreateNestedManyWithoutTrainingWeekInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput> | DayExerciseSeriesCreateWithoutTrainingWeekInput[] | DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput | DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput[]
    createMany?: DayExerciseSeriesCreateManyTrainingWeekInputEnvelope
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TrainingBlockUpdateOneRequiredWithoutWeeksNestedInput = {
    create?: XOR<TrainingBlockCreateWithoutWeeksInput, TrainingBlockUncheckedCreateWithoutWeeksInput>
    connectOrCreate?: TrainingBlockCreateOrConnectWithoutWeeksInput
    upsert?: TrainingBlockUpsertWithoutWeeksInput
    connect?: TrainingBlockWhereUniqueInput
    update?: XOR<XOR<TrainingBlockUpdateToOneWithWhereWithoutWeeksInput, TrainingBlockUpdateWithoutWeeksInput>, TrainingBlockUncheckedUpdateWithoutWeeksInput>
  }

  export type TrainingDayUpdateManyWithoutWeekNestedInput = {
    create?: XOR<TrainingDayCreateWithoutWeekInput, TrainingDayUncheckedCreateWithoutWeekInput> | TrainingDayCreateWithoutWeekInput[] | TrainingDayUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: TrainingDayCreateOrConnectWithoutWeekInput | TrainingDayCreateOrConnectWithoutWeekInput[]
    upsert?: TrainingDayUpsertWithWhereUniqueWithoutWeekInput | TrainingDayUpsertWithWhereUniqueWithoutWeekInput[]
    createMany?: TrainingDayCreateManyWeekInputEnvelope
    set?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    disconnect?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    delete?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    connect?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    update?: TrainingDayUpdateWithWhereUniqueWithoutWeekInput | TrainingDayUpdateWithWhereUniqueWithoutWeekInput[]
    updateMany?: TrainingDayUpdateManyWithWhereWithoutWeekInput | TrainingDayUpdateManyWithWhereWithoutWeekInput[]
    deleteMany?: TrainingDayScalarWhereInput | TrainingDayScalarWhereInput[]
  }

  export type DayExerciseSeriesUpdateManyWithoutTrainingWeekNestedInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput> | DayExerciseSeriesCreateWithoutTrainingWeekInput[] | DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput | DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput[]
    upsert?: DayExerciseSeriesUpsertWithWhereUniqueWithoutTrainingWeekInput | DayExerciseSeriesUpsertWithWhereUniqueWithoutTrainingWeekInput[]
    createMany?: DayExerciseSeriesCreateManyTrainingWeekInputEnvelope
    set?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    disconnect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    delete?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    update?: DayExerciseSeriesUpdateWithWhereUniqueWithoutTrainingWeekInput | DayExerciseSeriesUpdateWithWhereUniqueWithoutTrainingWeekInput[]
    updateMany?: DayExerciseSeriesUpdateManyWithWhereWithoutTrainingWeekInput | DayExerciseSeriesUpdateManyWithWhereWithoutTrainingWeekInput[]
    deleteMany?: DayExerciseSeriesScalarWhereInput | DayExerciseSeriesScalarWhereInput[]
  }

  export type TrainingDayUncheckedUpdateManyWithoutWeekNestedInput = {
    create?: XOR<TrainingDayCreateWithoutWeekInput, TrainingDayUncheckedCreateWithoutWeekInput> | TrainingDayCreateWithoutWeekInput[] | TrainingDayUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: TrainingDayCreateOrConnectWithoutWeekInput | TrainingDayCreateOrConnectWithoutWeekInput[]
    upsert?: TrainingDayUpsertWithWhereUniqueWithoutWeekInput | TrainingDayUpsertWithWhereUniqueWithoutWeekInput[]
    createMany?: TrainingDayCreateManyWeekInputEnvelope
    set?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    disconnect?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    delete?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    connect?: TrainingDayWhereUniqueInput | TrainingDayWhereUniqueInput[]
    update?: TrainingDayUpdateWithWhereUniqueWithoutWeekInput | TrainingDayUpdateWithWhereUniqueWithoutWeekInput[]
    updateMany?: TrainingDayUpdateManyWithWhereWithoutWeekInput | TrainingDayUpdateManyWithWhereWithoutWeekInput[]
    deleteMany?: TrainingDayScalarWhereInput | TrainingDayScalarWhereInput[]
  }

  export type DayExerciseSeriesUncheckedUpdateManyWithoutTrainingWeekNestedInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput> | DayExerciseSeriesCreateWithoutTrainingWeekInput[] | DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput | DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput[]
    upsert?: DayExerciseSeriesUpsertWithWhereUniqueWithoutTrainingWeekInput | DayExerciseSeriesUpsertWithWhereUniqueWithoutTrainingWeekInput[]
    createMany?: DayExerciseSeriesCreateManyTrainingWeekInputEnvelope
    set?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    disconnect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    delete?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    update?: DayExerciseSeriesUpdateWithWhereUniqueWithoutTrainingWeekInput | DayExerciseSeriesUpdateWithWhereUniqueWithoutTrainingWeekInput[]
    updateMany?: DayExerciseSeriesUpdateManyWithWhereWithoutTrainingWeekInput | DayExerciseSeriesUpdateManyWithWhereWithoutTrainingWeekInput[]
    deleteMany?: DayExerciseSeriesScalarWhereInput | DayExerciseSeriesScalarWhereInput[]
  }

  export type TrainingWeekCreateNestedOneWithoutTrainingDaysInput = {
    create?: XOR<TrainingWeekCreateWithoutTrainingDaysInput, TrainingWeekUncheckedCreateWithoutTrainingDaysInput>
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutTrainingDaysInput
    connect?: TrainingWeekWhereUniqueInput
  }

  export type DayExerciseCreateNestedManyWithoutTrainingDayInput = {
    create?: XOR<DayExerciseCreateWithoutTrainingDayInput, DayExerciseUncheckedCreateWithoutTrainingDayInput> | DayExerciseCreateWithoutTrainingDayInput[] | DayExerciseUncheckedCreateWithoutTrainingDayInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutTrainingDayInput | DayExerciseCreateOrConnectWithoutTrainingDayInput[]
    createMany?: DayExerciseCreateManyTrainingDayInputEnvelope
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
  }

  export type DayExerciseUncheckedCreateNestedManyWithoutTrainingDayInput = {
    create?: XOR<DayExerciseCreateWithoutTrainingDayInput, DayExerciseUncheckedCreateWithoutTrainingDayInput> | DayExerciseCreateWithoutTrainingDayInput[] | DayExerciseUncheckedCreateWithoutTrainingDayInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutTrainingDayInput | DayExerciseCreateOrConnectWithoutTrainingDayInput[]
    createMany?: DayExerciseCreateManyTrainingDayInputEnvelope
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
  }

  export type TrainingWeekUpdateOneRequiredWithoutTrainingDaysNestedInput = {
    create?: XOR<TrainingWeekCreateWithoutTrainingDaysInput, TrainingWeekUncheckedCreateWithoutTrainingDaysInput>
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutTrainingDaysInput
    upsert?: TrainingWeekUpsertWithoutTrainingDaysInput
    connect?: TrainingWeekWhereUniqueInput
    update?: XOR<XOR<TrainingWeekUpdateToOneWithWhereWithoutTrainingDaysInput, TrainingWeekUpdateWithoutTrainingDaysInput>, TrainingWeekUncheckedUpdateWithoutTrainingDaysInput>
  }

  export type DayExerciseUpdateManyWithoutTrainingDayNestedInput = {
    create?: XOR<DayExerciseCreateWithoutTrainingDayInput, DayExerciseUncheckedCreateWithoutTrainingDayInput> | DayExerciseCreateWithoutTrainingDayInput[] | DayExerciseUncheckedCreateWithoutTrainingDayInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutTrainingDayInput | DayExerciseCreateOrConnectWithoutTrainingDayInput[]
    upsert?: DayExerciseUpsertWithWhereUniqueWithoutTrainingDayInput | DayExerciseUpsertWithWhereUniqueWithoutTrainingDayInput[]
    createMany?: DayExerciseCreateManyTrainingDayInputEnvelope
    set?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    disconnect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    delete?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    update?: DayExerciseUpdateWithWhereUniqueWithoutTrainingDayInput | DayExerciseUpdateWithWhereUniqueWithoutTrainingDayInput[]
    updateMany?: DayExerciseUpdateManyWithWhereWithoutTrainingDayInput | DayExerciseUpdateManyWithWhereWithoutTrainingDayInput[]
    deleteMany?: DayExerciseScalarWhereInput | DayExerciseScalarWhereInput[]
  }

  export type DayExerciseUncheckedUpdateManyWithoutTrainingDayNestedInput = {
    create?: XOR<DayExerciseCreateWithoutTrainingDayInput, DayExerciseUncheckedCreateWithoutTrainingDayInput> | DayExerciseCreateWithoutTrainingDayInput[] | DayExerciseUncheckedCreateWithoutTrainingDayInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutTrainingDayInput | DayExerciseCreateOrConnectWithoutTrainingDayInput[]
    upsert?: DayExerciseUpsertWithWhereUniqueWithoutTrainingDayInput | DayExerciseUpsertWithWhereUniqueWithoutTrainingDayInput[]
    createMany?: DayExerciseCreateManyTrainingDayInputEnvelope
    set?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    disconnect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    delete?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    update?: DayExerciseUpdateWithWhereUniqueWithoutTrainingDayInput | DayExerciseUpdateWithWhereUniqueWithoutTrainingDayInput[]
    updateMany?: DayExerciseUpdateManyWithWhereWithoutTrainingDayInput | DayExerciseUpdateManyWithWhereWithoutTrainingDayInput[]
    deleteMany?: DayExerciseScalarWhereInput | DayExerciseScalarWhereInput[]
  }

  export type ExerciseCreateNestedManyWithoutExerciseGroupInput = {
    create?: XOR<ExerciseCreateWithoutExerciseGroupInput, ExerciseUncheckedCreateWithoutExerciseGroupInput> | ExerciseCreateWithoutExerciseGroupInput[] | ExerciseUncheckedCreateWithoutExerciseGroupInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutExerciseGroupInput | ExerciseCreateOrConnectWithoutExerciseGroupInput[]
    createMany?: ExerciseCreateManyExerciseGroupInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type ExerciseUncheckedCreateNestedManyWithoutExerciseGroupInput = {
    create?: XOR<ExerciseCreateWithoutExerciseGroupInput, ExerciseUncheckedCreateWithoutExerciseGroupInput> | ExerciseCreateWithoutExerciseGroupInput[] | ExerciseUncheckedCreateWithoutExerciseGroupInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutExerciseGroupInput | ExerciseCreateOrConnectWithoutExerciseGroupInput[]
    createMany?: ExerciseCreateManyExerciseGroupInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type ExerciseUpdateManyWithoutExerciseGroupNestedInput = {
    create?: XOR<ExerciseCreateWithoutExerciseGroupInput, ExerciseUncheckedCreateWithoutExerciseGroupInput> | ExerciseCreateWithoutExerciseGroupInput[] | ExerciseUncheckedCreateWithoutExerciseGroupInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutExerciseGroupInput | ExerciseCreateOrConnectWithoutExerciseGroupInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutExerciseGroupInput | ExerciseUpsertWithWhereUniqueWithoutExerciseGroupInput[]
    createMany?: ExerciseCreateManyExerciseGroupInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutExerciseGroupInput | ExerciseUpdateWithWhereUniqueWithoutExerciseGroupInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutExerciseGroupInput | ExerciseUpdateManyWithWhereWithoutExerciseGroupInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type ExerciseUncheckedUpdateManyWithoutExerciseGroupNestedInput = {
    create?: XOR<ExerciseCreateWithoutExerciseGroupInput, ExerciseUncheckedCreateWithoutExerciseGroupInput> | ExerciseCreateWithoutExerciseGroupInput[] | ExerciseUncheckedCreateWithoutExerciseGroupInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutExerciseGroupInput | ExerciseCreateOrConnectWithoutExerciseGroupInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutExerciseGroupInput | ExerciseUpsertWithWhereUniqueWithoutExerciseGroupInput[]
    createMany?: ExerciseCreateManyExerciseGroupInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutExerciseGroupInput | ExerciseUpdateWithWhereUniqueWithoutExerciseGroupInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutExerciseGroupInput | ExerciseUpdateManyWithWhereWithoutExerciseGroupInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type ExerciseGroupCreateNestedOneWithoutExercisesInput = {
    create?: XOR<ExerciseGroupCreateWithoutExercisesInput, ExerciseGroupUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: ExerciseGroupCreateOrConnectWithoutExercisesInput
    connect?: ExerciseGroupWhereUniqueInput
  }

  export type DayExerciseCreateNestedManyWithoutExerciseInput = {
    create?: XOR<DayExerciseCreateWithoutExerciseInput, DayExerciseUncheckedCreateWithoutExerciseInput> | DayExerciseCreateWithoutExerciseInput[] | DayExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutExerciseInput | DayExerciseCreateOrConnectWithoutExerciseInput[]
    createMany?: DayExerciseCreateManyExerciseInputEnvelope
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
  }

  export type DayExerciseUncheckedCreateNestedManyWithoutExerciseInput = {
    create?: XOR<DayExerciseCreateWithoutExerciseInput, DayExerciseUncheckedCreateWithoutExerciseInput> | DayExerciseCreateWithoutExerciseInput[] | DayExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutExerciseInput | DayExerciseCreateOrConnectWithoutExerciseInput[]
    createMany?: DayExerciseCreateManyExerciseInputEnvelope
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExerciseGroupUpdateOneRequiredWithoutExercisesNestedInput = {
    create?: XOR<ExerciseGroupCreateWithoutExercisesInput, ExerciseGroupUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: ExerciseGroupCreateOrConnectWithoutExercisesInput
    upsert?: ExerciseGroupUpsertWithoutExercisesInput
    connect?: ExerciseGroupWhereUniqueInput
    update?: XOR<XOR<ExerciseGroupUpdateToOneWithWhereWithoutExercisesInput, ExerciseGroupUpdateWithoutExercisesInput>, ExerciseGroupUncheckedUpdateWithoutExercisesInput>
  }

  export type DayExerciseUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<DayExerciseCreateWithoutExerciseInput, DayExerciseUncheckedCreateWithoutExerciseInput> | DayExerciseCreateWithoutExerciseInput[] | DayExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutExerciseInput | DayExerciseCreateOrConnectWithoutExerciseInput[]
    upsert?: DayExerciseUpsertWithWhereUniqueWithoutExerciseInput | DayExerciseUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: DayExerciseCreateManyExerciseInputEnvelope
    set?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    disconnect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    delete?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    update?: DayExerciseUpdateWithWhereUniqueWithoutExerciseInput | DayExerciseUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: DayExerciseUpdateManyWithWhereWithoutExerciseInput | DayExerciseUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: DayExerciseScalarWhereInput | DayExerciseScalarWhereInput[]
  }

  export type DayExerciseUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<DayExerciseCreateWithoutExerciseInput, DayExerciseUncheckedCreateWithoutExerciseInput> | DayExerciseCreateWithoutExerciseInput[] | DayExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: DayExerciseCreateOrConnectWithoutExerciseInput | DayExerciseCreateOrConnectWithoutExerciseInput[]
    upsert?: DayExerciseUpsertWithWhereUniqueWithoutExerciseInput | DayExerciseUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: DayExerciseCreateManyExerciseInputEnvelope
    set?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    disconnect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    delete?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    connect?: DayExerciseWhereUniqueInput | DayExerciseWhereUniqueInput[]
    update?: DayExerciseUpdateWithWhereUniqueWithoutExerciseInput | DayExerciseUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: DayExerciseUpdateManyWithWhereWithoutExerciseInput | DayExerciseUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: DayExerciseScalarWhereInput | DayExerciseScalarWhereInput[]
  }

  export type TrainingBlockCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingBlockCreateWithoutUserInput, TrainingBlockUncheckedCreateWithoutUserInput> | TrainingBlockCreateWithoutUserInput[] | TrainingBlockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingBlockCreateOrConnectWithoutUserInput | TrainingBlockCreateOrConnectWithoutUserInput[]
    createMany?: TrainingBlockCreateManyUserInputEnvelope
    connect?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type TrainingBlockUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingBlockCreateWithoutUserInput, TrainingBlockUncheckedCreateWithoutUserInput> | TrainingBlockCreateWithoutUserInput[] | TrainingBlockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingBlockCreateOrConnectWithoutUserInput | TrainingBlockCreateOrConnectWithoutUserInput[]
    createMany?: TrainingBlockCreateManyUserInputEnvelope
    connect?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type TrainingBlockUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingBlockCreateWithoutUserInput, TrainingBlockUncheckedCreateWithoutUserInput> | TrainingBlockCreateWithoutUserInput[] | TrainingBlockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingBlockCreateOrConnectWithoutUserInput | TrainingBlockCreateOrConnectWithoutUserInput[]
    upsert?: TrainingBlockUpsertWithWhereUniqueWithoutUserInput | TrainingBlockUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingBlockCreateManyUserInputEnvelope
    set?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    disconnect?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    delete?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    connect?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    update?: TrainingBlockUpdateWithWhereUniqueWithoutUserInput | TrainingBlockUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingBlockUpdateManyWithWhereWithoutUserInput | TrainingBlockUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingBlockScalarWhereInput | TrainingBlockScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TrainingBlockUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingBlockCreateWithoutUserInput, TrainingBlockUncheckedCreateWithoutUserInput> | TrainingBlockCreateWithoutUserInput[] | TrainingBlockUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingBlockCreateOrConnectWithoutUserInput | TrainingBlockCreateOrConnectWithoutUserInput[]
    upsert?: TrainingBlockUpsertWithWhereUniqueWithoutUserInput | TrainingBlockUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingBlockCreateManyUserInputEnvelope
    set?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    disconnect?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    delete?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    connect?: TrainingBlockWhereUniqueInput | TrainingBlockWhereUniqueInput[]
    update?: TrainingBlockUpdateWithWhereUniqueWithoutUserInput | TrainingBlockUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingBlockUpdateManyWithWhereWithoutUserInput | TrainingBlockUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingBlockScalarWhereInput | TrainingBlockScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TrainingDayCreateNestedOneWithoutDayExercisesInput = {
    create?: XOR<TrainingDayCreateWithoutDayExercisesInput, TrainingDayUncheckedCreateWithoutDayExercisesInput>
    connectOrCreate?: TrainingDayCreateOrConnectWithoutDayExercisesInput
    connect?: TrainingDayWhereUniqueInput
  }

  export type ExerciseCreateNestedOneWithoutDayExercisesInput = {
    create?: XOR<ExerciseCreateWithoutDayExercisesInput, ExerciseUncheckedCreateWithoutDayExercisesInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutDayExercisesInput
    connect?: ExerciseWhereUniqueInput
  }

  export type DayExerciseSeriesCreateNestedManyWithoutDayExerciseInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutDayExerciseInput, DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput> | DayExerciseSeriesCreateWithoutDayExerciseInput[] | DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput | DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput[]
    createMany?: DayExerciseSeriesCreateManyDayExerciseInputEnvelope
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
  }

  export type DayExerciseSeriesUncheckedCreateNestedManyWithoutDayExerciseInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutDayExerciseInput, DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput> | DayExerciseSeriesCreateWithoutDayExerciseInput[] | DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput | DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput[]
    createMany?: DayExerciseSeriesCreateManyDayExerciseInputEnvelope
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
  }

  export type TrainingDayUpdateOneRequiredWithoutDayExercisesNestedInput = {
    create?: XOR<TrainingDayCreateWithoutDayExercisesInput, TrainingDayUncheckedCreateWithoutDayExercisesInput>
    connectOrCreate?: TrainingDayCreateOrConnectWithoutDayExercisesInput
    upsert?: TrainingDayUpsertWithoutDayExercisesInput
    connect?: TrainingDayWhereUniqueInput
    update?: XOR<XOR<TrainingDayUpdateToOneWithWhereWithoutDayExercisesInput, TrainingDayUpdateWithoutDayExercisesInput>, TrainingDayUncheckedUpdateWithoutDayExercisesInput>
  }

  export type ExerciseUpdateOneRequiredWithoutDayExercisesNestedInput = {
    create?: XOR<ExerciseCreateWithoutDayExercisesInput, ExerciseUncheckedCreateWithoutDayExercisesInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutDayExercisesInput
    upsert?: ExerciseUpsertWithoutDayExercisesInput
    connect?: ExerciseWhereUniqueInput
    update?: XOR<XOR<ExerciseUpdateToOneWithWhereWithoutDayExercisesInput, ExerciseUpdateWithoutDayExercisesInput>, ExerciseUncheckedUpdateWithoutDayExercisesInput>
  }

  export type DayExerciseSeriesUpdateManyWithoutDayExerciseNestedInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutDayExerciseInput, DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput> | DayExerciseSeriesCreateWithoutDayExerciseInput[] | DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput | DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput[]
    upsert?: DayExerciseSeriesUpsertWithWhereUniqueWithoutDayExerciseInput | DayExerciseSeriesUpsertWithWhereUniqueWithoutDayExerciseInput[]
    createMany?: DayExerciseSeriesCreateManyDayExerciseInputEnvelope
    set?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    disconnect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    delete?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    update?: DayExerciseSeriesUpdateWithWhereUniqueWithoutDayExerciseInput | DayExerciseSeriesUpdateWithWhereUniqueWithoutDayExerciseInput[]
    updateMany?: DayExerciseSeriesUpdateManyWithWhereWithoutDayExerciseInput | DayExerciseSeriesUpdateManyWithWhereWithoutDayExerciseInput[]
    deleteMany?: DayExerciseSeriesScalarWhereInput | DayExerciseSeriesScalarWhereInput[]
  }

  export type DayExerciseSeriesUncheckedUpdateManyWithoutDayExerciseNestedInput = {
    create?: XOR<DayExerciseSeriesCreateWithoutDayExerciseInput, DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput> | DayExerciseSeriesCreateWithoutDayExerciseInput[] | DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput[]
    connectOrCreate?: DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput | DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput[]
    upsert?: DayExerciseSeriesUpsertWithWhereUniqueWithoutDayExerciseInput | DayExerciseSeriesUpsertWithWhereUniqueWithoutDayExerciseInput[]
    createMany?: DayExerciseSeriesCreateManyDayExerciseInputEnvelope
    set?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    disconnect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    delete?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    connect?: DayExerciseSeriesWhereUniqueInput | DayExerciseSeriesWhereUniqueInput[]
    update?: DayExerciseSeriesUpdateWithWhereUniqueWithoutDayExerciseInput | DayExerciseSeriesUpdateWithWhereUniqueWithoutDayExerciseInput[]
    updateMany?: DayExerciseSeriesUpdateManyWithWhereWithoutDayExerciseInput | DayExerciseSeriesUpdateManyWithWhereWithoutDayExerciseInput[]
    deleteMany?: DayExerciseSeriesScalarWhereInput | DayExerciseSeriesScalarWhereInput[]
  }

  export type DayExerciseCreateNestedOneWithoutSeriesInput = {
    create?: XOR<DayExerciseCreateWithoutSeriesInput, DayExerciseUncheckedCreateWithoutSeriesInput>
    connectOrCreate?: DayExerciseCreateOrConnectWithoutSeriesInput
    connect?: DayExerciseWhereUniqueInput
  }

  export type TrainingWeekCreateNestedOneWithoutDayExerciseSeriesInput = {
    create?: XOR<TrainingWeekCreateWithoutDayExerciseSeriesInput, TrainingWeekUncheckedCreateWithoutDayExerciseSeriesInput>
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutDayExerciseSeriesInput
    connect?: TrainingWeekWhereUniqueInput
  }

  export type DayExerciseUpdateOneRequiredWithoutSeriesNestedInput = {
    create?: XOR<DayExerciseCreateWithoutSeriesInput, DayExerciseUncheckedCreateWithoutSeriesInput>
    connectOrCreate?: DayExerciseCreateOrConnectWithoutSeriesInput
    upsert?: DayExerciseUpsertWithoutSeriesInput
    connect?: DayExerciseWhereUniqueInput
    update?: XOR<XOR<DayExerciseUpdateToOneWithWhereWithoutSeriesInput, DayExerciseUpdateWithoutSeriesInput>, DayExerciseUncheckedUpdateWithoutSeriesInput>
  }

  export type TrainingWeekUpdateOneRequiredWithoutDayExerciseSeriesNestedInput = {
    create?: XOR<TrainingWeekCreateWithoutDayExerciseSeriesInput, TrainingWeekUncheckedCreateWithoutDayExerciseSeriesInput>
    connectOrCreate?: TrainingWeekCreateOrConnectWithoutDayExerciseSeriesInput
    upsert?: TrainingWeekUpsertWithoutDayExerciseSeriesInput
    connect?: TrainingWeekWhereUniqueInput
    update?: XOR<XOR<TrainingWeekUpdateToOneWithWhereWithoutDayExerciseSeriesInput, TrainingWeekUpdateWithoutDayExerciseSeriesInput>, TrainingWeekUncheckedUpdateWithoutDayExerciseSeriesInput>
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TrainingWeekCreateWithoutBlockInput = {
    id?: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    trainingDays?: TrainingDayCreateNestedManyWithoutWeekInput
    dayExerciseSeries?: DayExerciseSeriesCreateNestedManyWithoutTrainingWeekInput
  }

  export type TrainingWeekUncheckedCreateWithoutBlockInput = {
    id?: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    trainingDays?: TrainingDayUncheckedCreateNestedManyWithoutWeekInput
    dayExerciseSeries?: DayExerciseSeriesUncheckedCreateNestedManyWithoutTrainingWeekInput
  }

  export type TrainingWeekCreateOrConnectWithoutBlockInput = {
    where: TrainingWeekWhereUniqueInput
    create: XOR<TrainingWeekCreateWithoutBlockInput, TrainingWeekUncheckedCreateWithoutBlockInput>
  }

  export type TrainingWeekCreateManyBlockInputEnvelope = {
    data: TrainingWeekCreateManyBlockInput | TrainingWeekCreateManyBlockInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutBlocksInput = {
    id?: string
    name: string
    username: string
    email: string
    password?: string | null
    isocode?: string | null
    lastVisitedWeek?: string | null
    registrationDate?: Date | string
    hidingDate?: Date | string | null
    subscriptionAmount?: number | null
    subscriptionFrequency?: string | null
    role?: $Enums.Role
    hidden?: boolean
    lastOKLogin?: Date | string | null
    lastKOLogin?: Date | string | null
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBlocksInput = {
    id?: string
    name: string
    username: string
    email: string
    password?: string | null
    isocode?: string | null
    lastVisitedWeek?: string | null
    registrationDate?: Date | string
    hidingDate?: Date | string | null
    subscriptionAmount?: number | null
    subscriptionFrequency?: string | null
    role?: $Enums.Role
    hidden?: boolean
    lastOKLogin?: Date | string | null
    lastKOLogin?: Date | string | null
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBlocksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlocksInput, UserUncheckedCreateWithoutBlocksInput>
  }

  export type TrainingWeekUpsertWithWhereUniqueWithoutBlockInput = {
    where: TrainingWeekWhereUniqueInput
    update: XOR<TrainingWeekUpdateWithoutBlockInput, TrainingWeekUncheckedUpdateWithoutBlockInput>
    create: XOR<TrainingWeekCreateWithoutBlockInput, TrainingWeekUncheckedCreateWithoutBlockInput>
  }

  export type TrainingWeekUpdateWithWhereUniqueWithoutBlockInput = {
    where: TrainingWeekWhereUniqueInput
    data: XOR<TrainingWeekUpdateWithoutBlockInput, TrainingWeekUncheckedUpdateWithoutBlockInput>
  }

  export type TrainingWeekUpdateManyWithWhereWithoutBlockInput = {
    where: TrainingWeekScalarWhereInput
    data: XOR<TrainingWeekUpdateManyMutationInput, TrainingWeekUncheckedUpdateManyWithoutBlockInput>
  }

  export type TrainingWeekScalarWhereInput = {
    AND?: TrainingWeekScalarWhereInput | TrainingWeekScalarWhereInput[]
    OR?: TrainingWeekScalarWhereInput[]
    NOT?: TrainingWeekScalarWhereInput | TrainingWeekScalarWhereInput[]
    id?: StringFilter<"TrainingWeek"> | string
    blockId?: StringFilter<"TrainingWeek"> | string
    weekNumber?: IntFilter<"TrainingWeek"> | number
    weekStart?: DateTimeFilter<"TrainingWeek"> | Date | string
    weekEnd?: DateTimeFilter<"TrainingWeek"> | Date | string
  }

  export type UserUpsertWithoutBlocksInput = {
    update: XOR<UserUpdateWithoutBlocksInput, UserUncheckedUpdateWithoutBlocksInput>
    create: XOR<UserCreateWithoutBlocksInput, UserUncheckedCreateWithoutBlocksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBlocksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBlocksInput, UserUncheckedUpdateWithoutBlocksInput>
  }

  export type UserUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainingBlockCreateWithoutWeeksInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
    user: UserCreateNestedOneWithoutBlocksInput
  }

  export type TrainingBlockUncheckedCreateWithoutWeeksInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
    userId: string
  }

  export type TrainingBlockCreateOrConnectWithoutWeeksInput = {
    where: TrainingBlockWhereUniqueInput
    create: XOR<TrainingBlockCreateWithoutWeeksInput, TrainingBlockUncheckedCreateWithoutWeeksInput>
  }

  export type TrainingDayCreateWithoutWeekInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
    dayExercises?: DayExerciseCreateNestedManyWithoutTrainingDayInput
  }

  export type TrainingDayUncheckedCreateWithoutWeekInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
    dayExercises?: DayExerciseUncheckedCreateNestedManyWithoutTrainingDayInput
  }

  export type TrainingDayCreateOrConnectWithoutWeekInput = {
    where: TrainingDayWhereUniqueInput
    create: XOR<TrainingDayCreateWithoutWeekInput, TrainingDayUncheckedCreateWithoutWeekInput>
  }

  export type TrainingDayCreateManyWeekInputEnvelope = {
    data: TrainingDayCreateManyWeekInput | TrainingDayCreateManyWeekInput[]
    skipDuplicates?: boolean
  }

  export type DayExerciseSeriesCreateWithoutTrainingWeekInput = {
    id?: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    isDropset?: boolean
    dayExercise: DayExerciseCreateNestedOneWithoutSeriesInput
  }

  export type DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput = {
    id?: string
    dayExerciseId: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    isDropset?: boolean
  }

  export type DayExerciseSeriesCreateOrConnectWithoutTrainingWeekInput = {
    where: DayExerciseSeriesWhereUniqueInput
    create: XOR<DayExerciseSeriesCreateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput>
  }

  export type DayExerciseSeriesCreateManyTrainingWeekInputEnvelope = {
    data: DayExerciseSeriesCreateManyTrainingWeekInput | DayExerciseSeriesCreateManyTrainingWeekInput[]
    skipDuplicates?: boolean
  }

  export type TrainingBlockUpsertWithoutWeeksInput = {
    update: XOR<TrainingBlockUpdateWithoutWeeksInput, TrainingBlockUncheckedUpdateWithoutWeeksInput>
    create: XOR<TrainingBlockCreateWithoutWeeksInput, TrainingBlockUncheckedCreateWithoutWeeksInput>
    where?: TrainingBlockWhereInput
  }

  export type TrainingBlockUpdateToOneWithWhereWithoutWeeksInput = {
    where?: TrainingBlockWhereInput
    data: XOR<TrainingBlockUpdateWithoutWeeksInput, TrainingBlockUncheckedUpdateWithoutWeeksInput>
  }

  export type TrainingBlockUpdateWithoutWeeksInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutBlocksNestedInput
  }

  export type TrainingBlockUncheckedUpdateWithoutWeeksInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TrainingDayUpsertWithWhereUniqueWithoutWeekInput = {
    where: TrainingDayWhereUniqueInput
    update: XOR<TrainingDayUpdateWithoutWeekInput, TrainingDayUncheckedUpdateWithoutWeekInput>
    create: XOR<TrainingDayCreateWithoutWeekInput, TrainingDayUncheckedCreateWithoutWeekInput>
  }

  export type TrainingDayUpdateWithWhereUniqueWithoutWeekInput = {
    where: TrainingDayWhereUniqueInput
    data: XOR<TrainingDayUpdateWithoutWeekInput, TrainingDayUncheckedUpdateWithoutWeekInput>
  }

  export type TrainingDayUpdateManyWithWhereWithoutWeekInput = {
    where: TrainingDayScalarWhereInput
    data: XOR<TrainingDayUpdateManyMutationInput, TrainingDayUncheckedUpdateManyWithoutWeekInput>
  }

  export type TrainingDayScalarWhereInput = {
    AND?: TrainingDayScalarWhereInput | TrainingDayScalarWhereInput[]
    OR?: TrainingDayScalarWhereInput[]
    NOT?: TrainingDayScalarWhereInput | TrainingDayScalarWhereInput[]
    id?: StringFilter<"TrainingDay"> | string
    date?: DateTimeFilter<"TrainingDay"> | Date | string
    dayLabel?: StringFilter<"TrainingDay"> | string
    dayNumber?: IntFilter<"TrainingDay"> | number
    weekId?: StringFilter<"TrainingDay"> | string
  }

  export type DayExerciseSeriesUpsertWithWhereUniqueWithoutTrainingWeekInput = {
    where: DayExerciseSeriesWhereUniqueInput
    update: XOR<DayExerciseSeriesUpdateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedUpdateWithoutTrainingWeekInput>
    create: XOR<DayExerciseSeriesCreateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedCreateWithoutTrainingWeekInput>
  }

  export type DayExerciseSeriesUpdateWithWhereUniqueWithoutTrainingWeekInput = {
    where: DayExerciseSeriesWhereUniqueInput
    data: XOR<DayExerciseSeriesUpdateWithoutTrainingWeekInput, DayExerciseSeriesUncheckedUpdateWithoutTrainingWeekInput>
  }

  export type DayExerciseSeriesUpdateManyWithWhereWithoutTrainingWeekInput = {
    where: DayExerciseSeriesScalarWhereInput
    data: XOR<DayExerciseSeriesUpdateManyMutationInput, DayExerciseSeriesUncheckedUpdateManyWithoutTrainingWeekInput>
  }

  export type DayExerciseSeriesScalarWhereInput = {
    AND?: DayExerciseSeriesScalarWhereInput | DayExerciseSeriesScalarWhereInput[]
    OR?: DayExerciseSeriesScalarWhereInput[]
    NOT?: DayExerciseSeriesScalarWhereInput | DayExerciseSeriesScalarWhereInput[]
    id?: StringFilter<"DayExerciseSeries"> | string
    dayExerciseId?: StringFilter<"DayExerciseSeries"> | string
    seriesNumber?: IntFilter<"DayExerciseSeries"> | number
    minReps?: IntFilter<"DayExerciseSeries"> | number
    maxReps?: IntFilter<"DayExerciseSeries"> | number
    minRir?: IntFilter<"DayExerciseSeries"> | number
    maxRir?: IntFilter<"DayExerciseSeries"> | number
    effectiveReps?: IntNullableFilter<"DayExerciseSeries"> | number | null
    effectiveWeight?: FloatNullableFilter<"DayExerciseSeries"> | number | null
    effectiveRir?: IntNullableFilter<"DayExerciseSeries"> | number | null
    trainingWeekId?: StringFilter<"DayExerciseSeries"> | string
    isDropset?: BoolFilter<"DayExerciseSeries"> | boolean
  }

  export type TrainingWeekCreateWithoutTrainingDaysInput = {
    id?: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    block: TrainingBlockCreateNestedOneWithoutWeeksInput
    dayExerciseSeries?: DayExerciseSeriesCreateNestedManyWithoutTrainingWeekInput
  }

  export type TrainingWeekUncheckedCreateWithoutTrainingDaysInput = {
    id?: string
    blockId: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    dayExerciseSeries?: DayExerciseSeriesUncheckedCreateNestedManyWithoutTrainingWeekInput
  }

  export type TrainingWeekCreateOrConnectWithoutTrainingDaysInput = {
    where: TrainingWeekWhereUniqueInput
    create: XOR<TrainingWeekCreateWithoutTrainingDaysInput, TrainingWeekUncheckedCreateWithoutTrainingDaysInput>
  }

  export type DayExerciseCreateWithoutTrainingDayInput = {
    id?: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
    exercise: ExerciseCreateNestedOneWithoutDayExercisesInput
    series?: DayExerciseSeriesCreateNestedManyWithoutDayExerciseInput
  }

  export type DayExerciseUncheckedCreateWithoutTrainingDayInput = {
    id?: string
    exerciseId: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
    series?: DayExerciseSeriesUncheckedCreateNestedManyWithoutDayExerciseInput
  }

  export type DayExerciseCreateOrConnectWithoutTrainingDayInput = {
    where: DayExerciseWhereUniqueInput
    create: XOR<DayExerciseCreateWithoutTrainingDayInput, DayExerciseUncheckedCreateWithoutTrainingDayInput>
  }

  export type DayExerciseCreateManyTrainingDayInputEnvelope = {
    data: DayExerciseCreateManyTrainingDayInput | DayExerciseCreateManyTrainingDayInput[]
    skipDuplicates?: boolean
  }

  export type TrainingWeekUpsertWithoutTrainingDaysInput = {
    update: XOR<TrainingWeekUpdateWithoutTrainingDaysInput, TrainingWeekUncheckedUpdateWithoutTrainingDaysInput>
    create: XOR<TrainingWeekCreateWithoutTrainingDaysInput, TrainingWeekUncheckedCreateWithoutTrainingDaysInput>
    where?: TrainingWeekWhereInput
  }

  export type TrainingWeekUpdateToOneWithWhereWithoutTrainingDaysInput = {
    where?: TrainingWeekWhereInput
    data: XOR<TrainingWeekUpdateWithoutTrainingDaysInput, TrainingWeekUncheckedUpdateWithoutTrainingDaysInput>
  }

  export type TrainingWeekUpdateWithoutTrainingDaysInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    block?: TrainingBlockUpdateOneRequiredWithoutWeeksNestedInput
    dayExerciseSeries?: DayExerciseSeriesUpdateManyWithoutTrainingWeekNestedInput
  }

  export type TrainingWeekUncheckedUpdateWithoutTrainingDaysInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    dayExerciseSeries?: DayExerciseSeriesUncheckedUpdateManyWithoutTrainingWeekNestedInput
  }

  export type DayExerciseUpsertWithWhereUniqueWithoutTrainingDayInput = {
    where: DayExerciseWhereUniqueInput
    update: XOR<DayExerciseUpdateWithoutTrainingDayInput, DayExerciseUncheckedUpdateWithoutTrainingDayInput>
    create: XOR<DayExerciseCreateWithoutTrainingDayInput, DayExerciseUncheckedCreateWithoutTrainingDayInput>
  }

  export type DayExerciseUpdateWithWhereUniqueWithoutTrainingDayInput = {
    where: DayExerciseWhereUniqueInput
    data: XOR<DayExerciseUpdateWithoutTrainingDayInput, DayExerciseUncheckedUpdateWithoutTrainingDayInput>
  }

  export type DayExerciseUpdateManyWithWhereWithoutTrainingDayInput = {
    where: DayExerciseScalarWhereInput
    data: XOR<DayExerciseUpdateManyMutationInput, DayExerciseUncheckedUpdateManyWithoutTrainingDayInput>
  }

  export type DayExerciseScalarWhereInput = {
    AND?: DayExerciseScalarWhereInput | DayExerciseScalarWhereInput[]
    OR?: DayExerciseScalarWhereInput[]
    NOT?: DayExerciseScalarWhereInput | DayExerciseScalarWhereInput[]
    id?: StringFilter<"DayExercise"> | string
    trainingDayId?: StringFilter<"DayExercise"> | string
    exerciseId?: StringFilter<"DayExercise"> | string
    athleteNotes?: StringNullableFilter<"DayExercise"> | string | null
    trainerNotes?: StringNullableFilter<"DayExercise"> | string | null
    day?: StringFilter<"DayExercise"> | string
    exerciseNumber?: IntNullableFilter<"DayExercise"> | number | null
  }

  export type ExerciseCreateWithoutExerciseGroupInput = {
    id?: string
    name: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
    dayExercises?: DayExerciseCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateWithoutExerciseGroupInput = {
    id?: string
    name: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
    dayExercises?: DayExerciseUncheckedCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseCreateOrConnectWithoutExerciseGroupInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutExerciseGroupInput, ExerciseUncheckedCreateWithoutExerciseGroupInput>
  }

  export type ExerciseCreateManyExerciseGroupInputEnvelope = {
    data: ExerciseCreateManyExerciseGroupInput | ExerciseCreateManyExerciseGroupInput[]
    skipDuplicates?: boolean
  }

  export type ExerciseUpsertWithWhereUniqueWithoutExerciseGroupInput = {
    where: ExerciseWhereUniqueInput
    update: XOR<ExerciseUpdateWithoutExerciseGroupInput, ExerciseUncheckedUpdateWithoutExerciseGroupInput>
    create: XOR<ExerciseCreateWithoutExerciseGroupInput, ExerciseUncheckedCreateWithoutExerciseGroupInput>
  }

  export type ExerciseUpdateWithWhereUniqueWithoutExerciseGroupInput = {
    where: ExerciseWhereUniqueInput
    data: XOR<ExerciseUpdateWithoutExerciseGroupInput, ExerciseUncheckedUpdateWithoutExerciseGroupInput>
  }

  export type ExerciseUpdateManyWithWhereWithoutExerciseGroupInput = {
    where: ExerciseScalarWhereInput
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutExerciseGroupInput>
  }

  export type ExerciseScalarWhereInput = {
    AND?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    OR?: ExerciseScalarWhereInput[]
    NOT?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    id?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    exerciseGroupId?: StringFilter<"Exercise"> | string
    recommendedMinReps?: IntNullableFilter<"Exercise"> | number | null
    recommendedMaxReps?: IntNullableFilter<"Exercise"> | number | null
  }

  export type ExerciseGroupCreateWithoutExercisesInput = {
    id?: string
    name: string
  }

  export type ExerciseGroupUncheckedCreateWithoutExercisesInput = {
    id?: string
    name: string
  }

  export type ExerciseGroupCreateOrConnectWithoutExercisesInput = {
    where: ExerciseGroupWhereUniqueInput
    create: XOR<ExerciseGroupCreateWithoutExercisesInput, ExerciseGroupUncheckedCreateWithoutExercisesInput>
  }

  export type DayExerciseCreateWithoutExerciseInput = {
    id?: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
    trainingDay: TrainingDayCreateNestedOneWithoutDayExercisesInput
    series?: DayExerciseSeriesCreateNestedManyWithoutDayExerciseInput
  }

  export type DayExerciseUncheckedCreateWithoutExerciseInput = {
    id?: string
    trainingDayId: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
    series?: DayExerciseSeriesUncheckedCreateNestedManyWithoutDayExerciseInput
  }

  export type DayExerciseCreateOrConnectWithoutExerciseInput = {
    where: DayExerciseWhereUniqueInput
    create: XOR<DayExerciseCreateWithoutExerciseInput, DayExerciseUncheckedCreateWithoutExerciseInput>
  }

  export type DayExerciseCreateManyExerciseInputEnvelope = {
    data: DayExerciseCreateManyExerciseInput | DayExerciseCreateManyExerciseInput[]
    skipDuplicates?: boolean
  }

  export type ExerciseGroupUpsertWithoutExercisesInput = {
    update: XOR<ExerciseGroupUpdateWithoutExercisesInput, ExerciseGroupUncheckedUpdateWithoutExercisesInput>
    create: XOR<ExerciseGroupCreateWithoutExercisesInput, ExerciseGroupUncheckedCreateWithoutExercisesInput>
    where?: ExerciseGroupWhereInput
  }

  export type ExerciseGroupUpdateToOneWithWhereWithoutExercisesInput = {
    where?: ExerciseGroupWhereInput
    data: XOR<ExerciseGroupUpdateWithoutExercisesInput, ExerciseGroupUncheckedUpdateWithoutExercisesInput>
  }

  export type ExerciseGroupUpdateWithoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseGroupUncheckedUpdateWithoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DayExerciseUpsertWithWhereUniqueWithoutExerciseInput = {
    where: DayExerciseWhereUniqueInput
    update: XOR<DayExerciseUpdateWithoutExerciseInput, DayExerciseUncheckedUpdateWithoutExerciseInput>
    create: XOR<DayExerciseCreateWithoutExerciseInput, DayExerciseUncheckedCreateWithoutExerciseInput>
  }

  export type DayExerciseUpdateWithWhereUniqueWithoutExerciseInput = {
    where: DayExerciseWhereUniqueInput
    data: XOR<DayExerciseUpdateWithoutExerciseInput, DayExerciseUncheckedUpdateWithoutExerciseInput>
  }

  export type DayExerciseUpdateManyWithWhereWithoutExerciseInput = {
    where: DayExerciseScalarWhereInput
    data: XOR<DayExerciseUpdateManyMutationInput, DayExerciseUncheckedUpdateManyWithoutExerciseInput>
  }

  export type TrainingBlockCreateWithoutUserInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
    weeks?: TrainingWeekCreateNestedManyWithoutBlockInput
  }

  export type TrainingBlockUncheckedCreateWithoutUserInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
    weeks?: TrainingWeekUncheckedCreateNestedManyWithoutBlockInput
  }

  export type TrainingBlockCreateOrConnectWithoutUserInput = {
    where: TrainingBlockWhereUniqueInput
    create: XOR<TrainingBlockCreateWithoutUserInput, TrainingBlockUncheckedCreateWithoutUserInput>
  }

  export type TrainingBlockCreateManyUserInputEnvelope = {
    data: TrainingBlockCreateManyUserInput | TrainingBlockCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    id?: string
    dueDate: Date | string
    amount: number
    isPayed?: boolean
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: string
    dueDate: Date | string
    amount: number
    isPayed?: boolean
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TrainingBlockUpsertWithWhereUniqueWithoutUserInput = {
    where: TrainingBlockWhereUniqueInput
    update: XOR<TrainingBlockUpdateWithoutUserInput, TrainingBlockUncheckedUpdateWithoutUserInput>
    create: XOR<TrainingBlockCreateWithoutUserInput, TrainingBlockUncheckedCreateWithoutUserInput>
  }

  export type TrainingBlockUpdateWithWhereUniqueWithoutUserInput = {
    where: TrainingBlockWhereUniqueInput
    data: XOR<TrainingBlockUpdateWithoutUserInput, TrainingBlockUncheckedUpdateWithoutUserInput>
  }

  export type TrainingBlockUpdateManyWithWhereWithoutUserInput = {
    where: TrainingBlockScalarWhereInput
    data: XOR<TrainingBlockUpdateManyMutationInput, TrainingBlockUncheckedUpdateManyWithoutUserInput>
  }

  export type TrainingBlockScalarWhereInput = {
    AND?: TrainingBlockScalarWhereInput | TrainingBlockScalarWhereInput[]
    OR?: TrainingBlockScalarWhereInput[]
    NOT?: TrainingBlockScalarWhereInput | TrainingBlockScalarWhereInput[]
    isVisible?: BoolFilter<"TrainingBlock"> | boolean
    id?: StringFilter<"TrainingBlock"> | string
    blockNumber?: IntFilter<"TrainingBlock"> | number
    description?: StringFilter<"TrainingBlock"> | string
    userId?: StringFilter<"TrainingBlock"> | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    amount?: FloatFilter<"Payment"> | number
    isPayed?: BoolFilter<"Payment"> | boolean
  }

  export type TrainingDayCreateWithoutDayExercisesInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
    week: TrainingWeekCreateNestedOneWithoutTrainingDaysInput
  }

  export type TrainingDayUncheckedCreateWithoutDayExercisesInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
    weekId: string
  }

  export type TrainingDayCreateOrConnectWithoutDayExercisesInput = {
    where: TrainingDayWhereUniqueInput
    create: XOR<TrainingDayCreateWithoutDayExercisesInput, TrainingDayUncheckedCreateWithoutDayExercisesInput>
  }

  export type ExerciseCreateWithoutDayExercisesInput = {
    id?: string
    name: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
    exerciseGroup: ExerciseGroupCreateNestedOneWithoutExercisesInput
  }

  export type ExerciseUncheckedCreateWithoutDayExercisesInput = {
    id?: string
    name: string
    exerciseGroupId: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
  }

  export type ExerciseCreateOrConnectWithoutDayExercisesInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutDayExercisesInput, ExerciseUncheckedCreateWithoutDayExercisesInput>
  }

  export type DayExerciseSeriesCreateWithoutDayExerciseInput = {
    id?: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    isDropset?: boolean
    trainingWeek: TrainingWeekCreateNestedOneWithoutDayExerciseSeriesInput
  }

  export type DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput = {
    id?: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    trainingWeekId: string
    isDropset?: boolean
  }

  export type DayExerciseSeriesCreateOrConnectWithoutDayExerciseInput = {
    where: DayExerciseSeriesWhereUniqueInput
    create: XOR<DayExerciseSeriesCreateWithoutDayExerciseInput, DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput>
  }

  export type DayExerciseSeriesCreateManyDayExerciseInputEnvelope = {
    data: DayExerciseSeriesCreateManyDayExerciseInput | DayExerciseSeriesCreateManyDayExerciseInput[]
    skipDuplicates?: boolean
  }

  export type TrainingDayUpsertWithoutDayExercisesInput = {
    update: XOR<TrainingDayUpdateWithoutDayExercisesInput, TrainingDayUncheckedUpdateWithoutDayExercisesInput>
    create: XOR<TrainingDayCreateWithoutDayExercisesInput, TrainingDayUncheckedCreateWithoutDayExercisesInput>
    where?: TrainingDayWhereInput
  }

  export type TrainingDayUpdateToOneWithWhereWithoutDayExercisesInput = {
    where?: TrainingDayWhereInput
    data: XOR<TrainingDayUpdateWithoutDayExercisesInput, TrainingDayUncheckedUpdateWithoutDayExercisesInput>
  }

  export type TrainingDayUpdateWithoutDayExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    week?: TrainingWeekUpdateOneRequiredWithoutTrainingDaysNestedInput
  }

  export type TrainingDayUncheckedUpdateWithoutDayExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    weekId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseUpsertWithoutDayExercisesInput = {
    update: XOR<ExerciseUpdateWithoutDayExercisesInput, ExerciseUncheckedUpdateWithoutDayExercisesInput>
    create: XOR<ExerciseCreateWithoutDayExercisesInput, ExerciseUncheckedCreateWithoutDayExercisesInput>
    where?: ExerciseWhereInput
  }

  export type ExerciseUpdateToOneWithWhereWithoutDayExercisesInput = {
    where?: ExerciseWhereInput
    data: XOR<ExerciseUpdateWithoutDayExercisesInput, ExerciseUncheckedUpdateWithoutDayExercisesInput>
  }

  export type ExerciseUpdateWithoutDayExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
    exerciseGroup?: ExerciseGroupUpdateOneRequiredWithoutExercisesNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutDayExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseGroupId?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DayExerciseSeriesUpsertWithWhereUniqueWithoutDayExerciseInput = {
    where: DayExerciseSeriesWhereUniqueInput
    update: XOR<DayExerciseSeriesUpdateWithoutDayExerciseInput, DayExerciseSeriesUncheckedUpdateWithoutDayExerciseInput>
    create: XOR<DayExerciseSeriesCreateWithoutDayExerciseInput, DayExerciseSeriesUncheckedCreateWithoutDayExerciseInput>
  }

  export type DayExerciseSeriesUpdateWithWhereUniqueWithoutDayExerciseInput = {
    where: DayExerciseSeriesWhereUniqueInput
    data: XOR<DayExerciseSeriesUpdateWithoutDayExerciseInput, DayExerciseSeriesUncheckedUpdateWithoutDayExerciseInput>
  }

  export type DayExerciseSeriesUpdateManyWithWhereWithoutDayExerciseInput = {
    where: DayExerciseSeriesScalarWhereInput
    data: XOR<DayExerciseSeriesUpdateManyMutationInput, DayExerciseSeriesUncheckedUpdateManyWithoutDayExerciseInput>
  }

  export type DayExerciseCreateWithoutSeriesInput = {
    id?: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
    trainingDay: TrainingDayCreateNestedOneWithoutDayExercisesInput
    exercise: ExerciseCreateNestedOneWithoutDayExercisesInput
  }

  export type DayExerciseUncheckedCreateWithoutSeriesInput = {
    id?: string
    trainingDayId: string
    exerciseId: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
  }

  export type DayExerciseCreateOrConnectWithoutSeriesInput = {
    where: DayExerciseWhereUniqueInput
    create: XOR<DayExerciseCreateWithoutSeriesInput, DayExerciseUncheckedCreateWithoutSeriesInput>
  }

  export type TrainingWeekCreateWithoutDayExerciseSeriesInput = {
    id?: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    block: TrainingBlockCreateNestedOneWithoutWeeksInput
    trainingDays?: TrainingDayCreateNestedManyWithoutWeekInput
  }

  export type TrainingWeekUncheckedCreateWithoutDayExerciseSeriesInput = {
    id?: string
    blockId: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
    trainingDays?: TrainingDayUncheckedCreateNestedManyWithoutWeekInput
  }

  export type TrainingWeekCreateOrConnectWithoutDayExerciseSeriesInput = {
    where: TrainingWeekWhereUniqueInput
    create: XOR<TrainingWeekCreateWithoutDayExerciseSeriesInput, TrainingWeekUncheckedCreateWithoutDayExerciseSeriesInput>
  }

  export type DayExerciseUpsertWithoutSeriesInput = {
    update: XOR<DayExerciseUpdateWithoutSeriesInput, DayExerciseUncheckedUpdateWithoutSeriesInput>
    create: XOR<DayExerciseCreateWithoutSeriesInput, DayExerciseUncheckedCreateWithoutSeriesInput>
    where?: DayExerciseWhereInput
  }

  export type DayExerciseUpdateToOneWithWhereWithoutSeriesInput = {
    where?: DayExerciseWhereInput
    data: XOR<DayExerciseUpdateWithoutSeriesInput, DayExerciseUncheckedUpdateWithoutSeriesInput>
  }

  export type DayExerciseUpdateWithoutSeriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
    trainingDay?: TrainingDayUpdateOneRequiredWithoutDayExercisesNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutDayExercisesNestedInput
  }

  export type DayExerciseUncheckedUpdateWithoutSeriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingDayId?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TrainingWeekUpsertWithoutDayExerciseSeriesInput = {
    update: XOR<TrainingWeekUpdateWithoutDayExerciseSeriesInput, TrainingWeekUncheckedUpdateWithoutDayExerciseSeriesInput>
    create: XOR<TrainingWeekCreateWithoutDayExerciseSeriesInput, TrainingWeekUncheckedCreateWithoutDayExerciseSeriesInput>
    where?: TrainingWeekWhereInput
  }

  export type TrainingWeekUpdateToOneWithWhereWithoutDayExerciseSeriesInput = {
    where?: TrainingWeekWhereInput
    data: XOR<TrainingWeekUpdateWithoutDayExerciseSeriesInput, TrainingWeekUncheckedUpdateWithoutDayExerciseSeriesInput>
  }

  export type TrainingWeekUpdateWithoutDayExerciseSeriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    block?: TrainingBlockUpdateOneRequiredWithoutWeeksNestedInput
    trainingDays?: TrainingDayUpdateManyWithoutWeekNestedInput
  }

  export type TrainingWeekUncheckedUpdateWithoutDayExerciseSeriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingDays?: TrainingDayUncheckedUpdateManyWithoutWeekNestedInput
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    name: string
    username: string
    email: string
    password?: string | null
    isocode?: string | null
    lastVisitedWeek?: string | null
    registrationDate?: Date | string
    hidingDate?: Date | string | null
    subscriptionAmount?: number | null
    subscriptionFrequency?: string | null
    role?: $Enums.Role
    hidden?: boolean
    lastOKLogin?: Date | string | null
    lastKOLogin?: Date | string | null
    blocks?: TrainingBlockCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    username: string
    email: string
    password?: string | null
    isocode?: string | null
    lastVisitedWeek?: string | null
    registrationDate?: Date | string
    hidingDate?: Date | string | null
    subscriptionAmount?: number | null
    subscriptionFrequency?: string | null
    role?: $Enums.Role
    hidden?: boolean
    lastOKLogin?: Date | string | null
    lastKOLogin?: Date | string | null
    blocks?: TrainingBlockUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blocks?: TrainingBlockUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isocode?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitedWeek?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hidingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    subscriptionFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    hidden?: BoolFieldUpdateOperationsInput | boolean
    lastOKLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastKOLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blocks?: TrainingBlockUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainingWeekCreateManyBlockInput = {
    id?: string
    weekNumber: number
    weekStart: Date | string
    weekEnd: Date | string
  }

  export type TrainingWeekUpdateWithoutBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingDays?: TrainingDayUpdateManyWithoutWeekNestedInput
    dayExerciseSeries?: DayExerciseSeriesUpdateManyWithoutTrainingWeekNestedInput
  }

  export type TrainingWeekUncheckedUpdateWithoutBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingDays?: TrainingDayUncheckedUpdateManyWithoutWeekNestedInput
    dayExerciseSeries?: DayExerciseSeriesUncheckedUpdateManyWithoutTrainingWeekNestedInput
  }

  export type TrainingWeekUncheckedUpdateManyWithoutBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    weekEnd?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingDayCreateManyWeekInput = {
    id?: string
    date: Date | string
    dayLabel: string
    dayNumber: number
  }

  export type DayExerciseSeriesCreateManyTrainingWeekInput = {
    id?: string
    dayExerciseId: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    isDropset?: boolean
  }

  export type TrainingDayUpdateWithoutWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    dayExercises?: DayExerciseUpdateManyWithoutTrainingDayNestedInput
  }

  export type TrainingDayUncheckedUpdateWithoutWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    dayExercises?: DayExerciseUncheckedUpdateManyWithoutTrainingDayNestedInput
  }

  export type TrainingDayUncheckedUpdateManyWithoutWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayLabel?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type DayExerciseSeriesUpdateWithoutTrainingWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    isDropset?: BoolFieldUpdateOperationsInput | boolean
    dayExercise?: DayExerciseUpdateOneRequiredWithoutSeriesNestedInput
  }

  export type DayExerciseSeriesUncheckedUpdateWithoutTrainingWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayExerciseId?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    isDropset?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DayExerciseSeriesUncheckedUpdateManyWithoutTrainingWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayExerciseId?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    isDropset?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DayExerciseCreateManyTrainingDayInput = {
    id?: string
    exerciseId: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
  }

  export type DayExerciseUpdateWithoutTrainingDayInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
    exercise?: ExerciseUpdateOneRequiredWithoutDayExercisesNestedInput
    series?: DayExerciseSeriesUpdateManyWithoutDayExerciseNestedInput
  }

  export type DayExerciseUncheckedUpdateWithoutTrainingDayInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
    series?: DayExerciseSeriesUncheckedUpdateManyWithoutDayExerciseNestedInput
  }

  export type DayExerciseUncheckedUpdateManyWithoutTrainingDayInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ExerciseCreateManyExerciseGroupInput = {
    id?: string
    name: string
    recommendedMinReps?: number | null
    recommendedMaxReps?: number | null
  }

  export type ExerciseUpdateWithoutExerciseGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
    dayExercises?: DayExerciseUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutExerciseGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
    dayExercises?: DayExerciseUncheckedUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateManyWithoutExerciseGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    recommendedMinReps?: NullableIntFieldUpdateOperationsInput | number | null
    recommendedMaxReps?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DayExerciseCreateManyExerciseInput = {
    id?: string
    trainingDayId: string
    athleteNotes?: string | null
    trainerNotes?: string | null
    day: string
    exerciseNumber?: number | null
  }

  export type DayExerciseUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
    trainingDay?: TrainingDayUpdateOneRequiredWithoutDayExercisesNestedInput
    series?: DayExerciseSeriesUpdateManyWithoutDayExerciseNestedInput
  }

  export type DayExerciseUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingDayId?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
    series?: DayExerciseSeriesUncheckedUpdateManyWithoutDayExerciseNestedInput
  }

  export type DayExerciseUncheckedUpdateManyWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingDayId?: StringFieldUpdateOperationsInput | string
    athleteNotes?: NullableStringFieldUpdateOperationsInput | string | null
    trainerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    exerciseNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TrainingBlockCreateManyUserInput = {
    isVisible?: boolean
    id?: string
    blockNumber: number
    description: string
  }

  export type PaymentCreateManyUserInput = {
    id?: string
    dueDate: Date | string
    amount: number
    isPayed?: boolean
  }

  export type TrainingBlockUpdateWithoutUserInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    weeks?: TrainingWeekUpdateManyWithoutBlockNestedInput
  }

  export type TrainingBlockUncheckedUpdateWithoutUserInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    weeks?: TrainingWeekUncheckedUpdateManyWithoutBlockNestedInput
  }

  export type TrainingBlockUncheckedUpdateManyWithoutUserInput = {
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    id?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    isPayed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    isPayed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    isPayed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DayExerciseSeriesCreateManyDayExerciseInput = {
    id?: string
    seriesNumber: number
    minReps: number
    maxReps: number
    minRir: number
    maxRir: number
    effectiveReps?: number | null
    effectiveWeight?: number | null
    effectiveRir?: number | null
    trainingWeekId: string
    isDropset?: boolean
  }

  export type DayExerciseSeriesUpdateWithoutDayExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    isDropset?: BoolFieldUpdateOperationsInput | boolean
    trainingWeek?: TrainingWeekUpdateOneRequiredWithoutDayExerciseSeriesNestedInput
  }

  export type DayExerciseSeriesUncheckedUpdateWithoutDayExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    trainingWeekId?: StringFieldUpdateOperationsInput | string
    isDropset?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DayExerciseSeriesUncheckedUpdateManyWithoutDayExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    seriesNumber?: IntFieldUpdateOperationsInput | number
    minReps?: IntFieldUpdateOperationsInput | number
    maxReps?: IntFieldUpdateOperationsInput | number
    minRir?: IntFieldUpdateOperationsInput | number
    maxRir?: IntFieldUpdateOperationsInput | number
    effectiveReps?: NullableIntFieldUpdateOperationsInput | number | null
    effectiveWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    effectiveRir?: NullableIntFieldUpdateOperationsInput | number | null
    trainingWeekId?: StringFieldUpdateOperationsInput | string
    isDropset?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}