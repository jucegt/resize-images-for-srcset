import ISize from './ISize';
import { PathLike } from 'node:fs';
import { TFit, TFormat } from './Types';

export default interface IConfig {
  input: string,
  output: PathLike,
  fit: TFit,
  sizes: ISize[],
  formats: TFormat[]
}

