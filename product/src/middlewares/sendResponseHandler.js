import { resultCodes } from "../enum";

export const sendResponseHandler = async (req, res, next) => {
  if (res) {
    res.status(res.locals?.response?.status ?? 200).send({
      sucess: resultCodes.SUCCESS,
      data: res.locals.response.data
    });

  } else {
    next()
  }
}
