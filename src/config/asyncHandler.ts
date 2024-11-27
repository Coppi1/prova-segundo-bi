// asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

export function asyncHandler(fn: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
}
