export { default } from "next-auth/middleware"

export const config = { matcher: ["/admin/edit", "/admin/create"] }