export default interface IMail {
  send(to: string, body: string): Promise<void>;
}
