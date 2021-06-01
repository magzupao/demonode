export interface IDataSerie {
  id?: number;
  codStation?: number;
  ts?: string;
  temp?: string;
  wind?: string;
  prec?: string;
  pres?: string;
  hum?: string;
}

export class DataSerie implements IDataSerie {
  constructor(
    public id?: number,
    public codStation?: number,
    public ts?: string,
    public temp?: string,
    public wind?: string,
    public prec?: string,
    public pres?: string,
    public hum?: string
  ) {}
}
