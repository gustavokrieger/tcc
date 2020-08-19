import * as pmdOutput from './pmdOutput';

export type PmdViolation = pmdOutput.Violation & pmdOutput.File.filename;
