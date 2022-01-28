import type { Request, Response } from "express";
import { RequestParams, Projection, ResponseType } from "../types/types";

const calculationHandler = (
  req: Request<{}, {}, {}, RequestParams>,
  res: Response<ResponseType>
) => {
  const initial = req.query.initial;
  const monthlyDeposit = req.query.monthlyDeposit;
  const interestRate = req.query.interestRate / 100;
  const maxYears = req.query.maxYears;

  const data: Projection = {
    year: [],
    amount: [],
    investment: 0,
    ROI: 0,
    profit: 0,
  };

  const monthlyInterestRate = interestRate / 12;
  let finalAmount: number = 0;

  for (let year = 0; year <= maxYears; year++) {
    const months = year * 12;

    const yearAmount =
      (monthlyDeposit * (Math.pow(1 + monthlyInterestRate, months) - 1)) /
        monthlyInterestRate +
      initial * Math.pow(1 + monthlyInterestRate, months);

    data.year.push(year);
    data.amount.push(yearAmount);
    if (year == maxYears) {
      finalAmount = yearAmount;
    }
  }

  const rollingInvestment = maxYears * 12 * monthlyDeposit;

  data.investment = +rollingInvestment + +initial;
  data.ROI = finalAmount / data.investment;
  data.profit = finalAmount - data.investment;

  // null query test

  if (data.amount.length == 0) {
    for (let i = 0; i < 50; i++) {
      data.amount.push(null);
      data.year.push(i);
    }
  }
  res.json({
    data: data,
  });
};

export default calculationHandler;
