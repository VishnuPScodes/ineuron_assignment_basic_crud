import { Request, Response } from 'express';
import { someNewServiceThatGetsReports } from '../services/report.service';

export const getReportsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  // const {} = req.body;

  // call a service that gets the all the reports
  const reports = await someNewServiceThatGetsReports();
  // return reports;
  res.send(reports);
};
