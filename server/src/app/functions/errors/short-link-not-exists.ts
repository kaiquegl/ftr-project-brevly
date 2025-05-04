export class ShortLinkNotExists extends Error {
  constructor() {
    super("Short link not exists.");
  }
}
