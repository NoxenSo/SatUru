import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import router from "./routes";
import { logger } from "./lib/logger";

// Fail fast if secrets are missing
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required");
}

const app: Express = express();

// Trust Replit's reverse-proxy so secure cookies and req.ip work correctly
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// ---------------------------------------------------------------------------
// CORS — explicit allowlist only.  Never reflect arbitrary origins when
// credentials:true; that enables cross-site cookie theft / CSRF.
// In Replit all traffic reaches the browser through the same proxy domain,
// so same-origin requests don't trigger CORS at all. We only need to allow
// the Replit dev domain (available via REPLIT_DEV_DOMAIN) during local dev.
// ---------------------------------------------------------------------------
const buildAllowedOrigins = (): (string | RegExp)[] => {
  const origins: (string | RegExp)[] = [];

  // Replit dev proxy: https://<repl-id>-<port>.repl.co or similar
  const replitDevDomain = process.env.REPLIT_DEV_DOMAIN;
  if (replitDevDomain) {
    // Allow only the exact dev domain — never a wildcard *.repl.co pattern,
    // which would let any other Replit project make credentialed requests here.
    origins.push(`https://${replitDevDomain}`);
  }

  // Any explicitly configured frontend URL (useful for custom deployments)
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) {
    origins.push(frontendUrl);
  }

  // Local development
  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:24803");
    origins.push("http://127.0.0.1:24803");
  }

  return origins;
};

app.use(
  cors({
    origin: buildAllowedOrigins(),
    credentials: true,
  }),
);

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // Secure in production (Replit always serves HTTPS in prod)
      secure: process.env.NODE_ENV === "production",
      // "lax" protects against CSRF for top-level navigations while allowing
      // same-site subrequests.  "strict" would break OAuth redirects; "none"
      // without a concrete cross-site need is unnecessary risk.
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
