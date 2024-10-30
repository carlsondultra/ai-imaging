import { Context, Hono } from "hono"
import { handle } from "hono/vercel"
import { AuthConfig, initAuthConfig } from "@hono/auth-js"

import images from "./images"
import ai from "./ai"
import users from "./users"
import projects from "./projects"
import subscriptions from "./subscriptions"

import authConfig from "@/auth.config"

// use edge or nodejs (preference)
export const runtime = "nodejs"

function getAuthConfig(c: Context): AuthConfig {
    return {
        secret: c.env.AUTH_SECRET,
        ...authConfig
    }
}

const app = new Hono().basePath("/api")

app.use("*", initAuthConfig(getAuthConfig))


const routes = app
    .route("/ai", ai)
    .route("/images", images)
    .route("/users", users)
    .route("/projects", projects)
    .route("/subscriptions", subscriptions)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
