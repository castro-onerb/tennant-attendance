export class Left<L, R = never> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isRight(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  mapLeft<T>(fn: (l: L) => T): Either<T, R> {
    return new Left(fn(this.value));
  }

  getOrElse(defaultValue: R): R {
    return defaultValue;
  }

  fold<T>(onLeft: (l: L) => T, _onRight: (r: R) => T): T {
    return onLeft(this.value);
  }
}

export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }

  map<T>(fn: (r: R) => T): Either<L, T> {
    return new Right(fn(this.value));
  }

  mapLeft<T>(_fn: (l: L) => T): Either<T, R> {
    return new Right(this.value);
  }

  getOrElse(_defaultValue: R): R {
    return this.value;
  }

  fold<T>(_onLeft: (l: L) => T, onRight: (r: R) => T): T {
    return onRight(this.value);
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R = never>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
