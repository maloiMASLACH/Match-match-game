export class ID {
  static id = 1;

  static getNewId(): number {
    return this.id++;
  }
}
