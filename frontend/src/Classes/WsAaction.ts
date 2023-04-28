export class WsAction {
  constructor(
    public type: string,
    public payload: string,
    public text?: string
  ) {}
}
