export class CommentModel {
  constructor(public uuid: string,
              public name: string,
              public comment: string,
              public starts: number) {
  }
}
