export class ShortLinkExists extends Error {
  constructor() {
    super("Short link already exists.");
  }
}
