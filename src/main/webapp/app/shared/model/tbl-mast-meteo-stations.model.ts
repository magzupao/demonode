export interface ITblMastMeteoStations {
  id?: number;
  name?: string;
  longitude?: number;
  latitude?: number;
}

export class TblMastMeteoStations implements ITblMastMeteoStations {
  constructor(public id?: number, public name?: string, public longitude?: number, public latitude?: number) {}
}
