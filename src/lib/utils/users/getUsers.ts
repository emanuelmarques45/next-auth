import { api } from "@/lib/services/api"
import { GetServerSidePropsContext, PreviewData } from "next"
import { ParsedUrlQuery } from "querystring"

export function getUsers(
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const users = api(ctx).get("/users")
  return users
}
