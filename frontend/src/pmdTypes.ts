export type Report = {
  files: File[];
};

export type File = {
  filename: string;
  violations: Violation[];
};

export type Violation = {
  beginline: number;
  begincolumn: number;
  endline: number;
  endcolumn: number;
  rule: string;
};
