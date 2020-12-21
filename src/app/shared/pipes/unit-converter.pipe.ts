import { Pipe, PipeTransform } from '@angular/core';

const TRANSFORMATIONS: { [key: string]: number } = {
  m: 1,
  mi: 0.000621371,
  km: 1000,
};
export function convert(
  value: number,
  inputUnitType: string,
  outputUnitType: string
) {
  if (
    !(inputUnitType in TRANSFORMATIONS) ||
    !(outputUnitType in TRANSFORMATIONS)
  ) {
    throw new Error(
      `Cannot convert from ${inputUnitType} to ${outputUnitType}`
    );
  }

  const valueInMeters = (1 / TRANSFORMATIONS[inputUnitType]) * value;
  return valueInMeters * TRANSFORMATIONS[outputUnitType];
}

@Pipe({
  name: 'unitConverter',
})
export class UnitConverterPipe implements PipeTransform {
  transform(
    value: number,
    inputUnitType: string,
    outputUnitType: string
  ): number {
    return convert(value, inputUnitType, outputUnitType);
  }
}
