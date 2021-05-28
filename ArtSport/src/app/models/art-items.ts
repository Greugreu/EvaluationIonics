import { LocationModel } from "./location";

export class ArtItems{
  public id: number;

  constructor(
    public name: string,
    public grade: number,
    public location: LocationModel,
    public image: string,
    public createdAt: Date
  ){}
}
