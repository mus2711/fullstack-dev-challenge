export type Projection = {
  year: Array<number>;
  amount: Array<number | null>;
  investment: number;
  ROI: number;
  profit: number;
};

export type RequestParams = {
  initial: number;
  monthlyDeposit: number;
  interestRate: number;
  maxYears: number;
};

export type ResponseType = {
  data: Projection;
};

// for projectHandler.ts
export type ProjectionRequest = {
  maxYears: number;
  interestRate: number;
  initial: number;
  target: number;
};

export type outputProjection = {
  monthlyDeposit: number;
};

export type projectionResponseType = {
  data: outputProjection;
};
