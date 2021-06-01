export interface ITblMastMeteoVariables {
  id?: number;
  name?: string;
  unit?: string;
}

export class TblMastMeteoVariables implements ITblMastMeteoVariables {
  constructor(public id?: number, public name?: string, public unit?: string) {}
}
