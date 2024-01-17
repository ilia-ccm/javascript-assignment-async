import {
  waitFor,
  waitForAsync,
  promiseToAsync,
  promiseToAsyncHello,
  waitPromise,
  debounce,
  tryCatch,
  tryFetch,
} from '../questions/index';

async function timeout(t) {
  await new Promise((r) => setTimeout(r, t));
}

describe('waitPromise', () => {
  it('0msec', async () => {
    jest.setTimeout(60000);

    const start = performance.now();
    expect(waitPromise(0)).resolves.toBeUndefined();
    const stop = performance.now();

    expect(stop - start).toBeGreaterThanOrEqual(0);
    expect(stop - start).toBeLessThan(100);
  });

  it('500msec', async () => {
    jest.setTimeout(60000);

    const start = performance.now();
   await expect(waitPromise(500)).resolves.toBeUndefined();
    const stop = performance.now();

    expect(stop - start).toBeGreaterThanOrEqual(500);
    expect(stop - start).toBeLessThan(600);
  });

  it('1000msec', async () => {
    jest.setTimeout(60000);

    const start = performance.now();
    await expect(waitPromise(1000)).resolves.toBeUndefined();
    const stop = performance.now();

    expect(stop - start).toBeGreaterThanOrEqual(1000);
    expect(stop - start).toBeLessThan(1100);
  });

  it('rejects', async () => {
    jest.setTimeout(60000);

    await expect(waitPromise(3000)).rejects.toBeUndefined();
  });
});

describe('promiseToAsync', () => {
  it('fulfills', async () => {
    jest.setTimeout(60000);
    const promise = new Promise((res) => {
      res('result');
    });

    const result = await promiseToAsync(promise);

    expect(result).toBe('result');
  });

  it('rejects', async () => {
    jest.setTimeout(60000);
    const promise = new Promise((res, rej) => {
      rej('failure');
    });

    expect(promiseToAsync(promise)).rejects.toBe('failure');
  });
});

describe('promiseToAsyncHello', () => {
  it('fulfills', async () => {
    jest.setTimeout(60000);
    const promise = new Promise((res) => {
      res('result');
    });

    await expect(promiseToAsyncHello(promise)).resolves.toBe('result');
  });

  it('rejects', async () => {
    jest.setTimeout(60000);
    const promise = new Promise((res, rej) => {
      rej('failure');
    });

    expect(promiseToAsyncHello(promise)).resolves.toBe('hello');
  });
});

describe('waitForAsync', () => {
  it('fulfills', async () => {
    jest.setTimeout(60000);

    const callTimes = [];
    const f = function () {
      callTimes.push(performance.now());
    };

    const start = performance.now();
    await expect(waitForAsync(f)).resolves.toBeUndefined();

    expect(callTimes.length).toBe(2);

    expect(callTimes[0] - start).toBeGreaterThanOrEqual(0);
    expect(callTimes[0] - start).toBeLessThan(100);

    expect(callTimes[1] - start).toBeGreaterThanOrEqual(500);
    expect(callTimes[1] - start).toBeLessThan(600);
  });

  it('rejects', async () => {
    jest.setTimeout(60000);
    const f = function () {
      throw 'error';
    };
    await expect(waitForAsync(f)).rejects.toBe('error');
  });
});

async function throwError() {
  throw 'waitfor error';
}

describe('waitFor', () => {
  it('fulfills', async () => {
    jest.setTimeout(60000);

    const callTimes = [];
    let run = 1;
    const f = async function () {
      callTimes.push(performance.now());

      switch (run++) {
        case 1:
          return 'Hello';
        case 2:
          return ' world!';
        default:
          console.log(3);
          return ' OOOPS! You made a mistake!';
      }
    };

    let result = null;
    const cb = (res) => {
      result = res;
    };

    const start = performance.now();
    await expect(waitFor(f, cb)).toBeUndefined();
    expect(callTimes.length).toBe(1);
    expect(result).toBe(null);

    await timeout(600);

    expect(callTimes.length).toBe(2);

    expect(callTimes[1] - start).toBeGreaterThanOrEqual(500);
    expect(callTimes[1] - start).toBeLessThan(600);
    expect(result).toBe('Hello world!');
  });

  it('rejects', async () => {
    jest.setTimeout(60000);

    let result = null;
    const cb = (res) => {
      result = res;
    };

    await expect(waitFor(throwError, cb)).toBeUndefined();
    await timeout(600);
    expect(result).toBe('');
  });
});

describe('debounce', () => {
  it('called once', async () => {
    jest.setTimeout(60000);

    const f = jest.fn();

    const start = performance.now();
    const debouncedFunc = debounce(f, 100);

    expect(debouncedFunc.constructor.name).toBe('Function');

    debouncedFunc(1);
    debouncedFunc(2);
    await timeout(300);

    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toBeCalledWith(2);
  });

  it('called twice', async () => {
    jest.setTimeout(60000);

    const f = jest.fn();

    const debouncedFunc = debounce(f, 100);
    expect(f).toHaveBeenCalledTimes(0);

    debouncedFunc(1);
    await timeout(200);

    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toBeCalledWith(1);

    debouncedFunc(2);
    await timeout(200);

    expect(f).toHaveBeenCalledTimes(2);
    expect(f).toBeCalledWith(2);
  });
});

const throwsRangeError = () => {
  throw new RangeError('Out of range');
};

describe('tryCatch', () => {
  it('works ', async () => {
    const f = () => 123;
    expect(tryCatch(f)).toBe(123);
  });

  it('catches TypeError', async () => {
    const f = () => null.abc();
    expect(tryCatch(f)).toBe('hello');
  });

  it('re-throws', async () => {
    await expect(() => tryCatch(throwsRangeError)).toThrow(RangeError);
  });
});

// describe('tryFetch', () => {
//   it('works ', async () => {
//     const f = () => 123;
//     expect(tryCatch(f)).toBe(123);
//   });

//   it('catches TypeError', async () => {
//     const f = () => null.abc();
//     expect(tryCatch(f)).toBe('hello');
//   });

//   it('re-throws', async () => {
//     const f = () => {
//       throw new RangeError('Out of range');
//     };
//     expect(()=>tryFetch(f)).toThrow(RangeError);
//   });
// });
