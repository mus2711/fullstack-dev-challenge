import type { Request, Response } from "express";
import {
  outputProjection,
  ProjectionRequest,
  projectionResponseType,
} from "../types/types";

const projectionHandler = (
  req: Request<{}, {}, {}, ProjectionRequest>,
  res: Response<projectionResponseType>
) => {
  const initial = req.query.initial;
  const interestRate = req.query.interestRate / 100;
  const maxYears = req.query.maxYears;
  const target = req.query.target;

  const data: outputProjection = {
    monthlyDeposit: 0,
  };
  const monthlyInterestRate = interestRate / 12;
  const totalMonths = maxYears * 12;
  const neededMd =
    ((target - initial * Math.pow(1 + monthlyInterestRate, totalMonths)) *
      monthlyInterestRate) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  data.monthlyDeposit = neededMd;

  res.json({
    data: data,
  });
};

export default projectionHandler;
