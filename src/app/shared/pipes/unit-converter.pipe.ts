import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConverter',
})
export class UnitConverterPipe implements PipeTransform {
  private static readonly TRANSFORMATIONS: { [key: string]: number } = {
    m: 1,
    mi: 0.000621371,
  };

  transform(
    value: number,
    inputUnitType: string,
    outputUnitType: string
  ): number {
    if (
      !(inputUnitType in UnitConverterPipe.TRANSFORMATIONS) ||
      !(outputUnitType in UnitConverterPipe.TRANSFORMATIONS)
    ) {
      throw new Error(
        `Cannot convert from ${inputUnitType} to ${outputUnitType}`
      );
    }

    const valueInMeters =
      (1 / UnitConverterPipe.TRANSFORMATIONS[inputUnitType]) * value;
    return valueInMeters * UnitConverterPipe.TRANSFORMATIONS[outputUnitType];
  }
}
