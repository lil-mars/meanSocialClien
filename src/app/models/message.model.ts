export class Message {
  constructor(
    public id: string,
    public text: string,
    public viewed: string,
    public createdAt: string,
    public emitter: string,
    public receiver: string,
  ) {
  }
}
