/*
  Instructions:
  - Read the comment prior to each function for an explanation of the problem.
  - Fill in the function block for each problem.
  - Look at test cases to help clarify questions.
  - Run `npm test` to see how you're doing.
*/

/*
  waitPromise(time): Return a promise which resolves in `time`  when time less than 2000 msec. 
  Reject right away if given time exceedes 2000 msec.
*/
export function waitPromise(time) {
  // write code here
}

/*
  Use given promise result to return a value from async function
*/
export async function promiseToAsync(promise) {
  // write code here
  return await promise;
}

/*
  Use given promise result to return a value from async function. If rejected return 'hello'
*/
export async function promiseToAsyncHello(promise) {
  // write code here
}

/*
  f is an function. Debounce given function.  
  Debouncing means you should wait delay msec before calling f and if it was 
  called again during delay, delay time should be reset.
  Don't forget about arguments.
*/
export function debounce(f, delay) {
  // write code here
}

/*
  f is a function. Call it once immediately, wait 500 msec, call it again.
  if f() rejects, re-throw an error
*/
export async function waitForAsync(f) {
  // write code here
}

/*
  f is an async function returning a string. 
  Call it once immediately, wait 500 msec, call it again.
  Concatenate call results and call a cb() callback with this string as a parameter
  if f() throws an error, call cb with an empty string nothing
*/
export function waitFor(f, cb) {
  // write code here
}

/*
  Return f() result.
  Return 'hello' string if f() throws a TypeError. Re-throw on all other errors. 
*/
export function tryCatch(f) {
  try {
    return f();
  } catch (error) {
    // write code here
  }
}
