import { NextApiRequest } from "next"

export function getHeaderToken(req: NextApiRequest) {
  return req.headers.authorization?.split(" ")[1]
}
