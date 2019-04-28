export default class NoMatchError extends Error {
  constructor() {
    super("No element matched the predicate");
  }
}
