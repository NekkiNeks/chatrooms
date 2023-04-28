interface iWsAction {
  type: string;
  payload: any;
  text?: string;
}

export class WsAction implements iWsAction {
  constructor(public type: string, public payload: any, public text?: string) {}
}
