import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

/** Normalise an email address: trim whitespace then lowercase. */
function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name?.trim() || !email?.trim() || !password) {
      res.status(400).json({ error: "Name, email and password are required" });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({ error: "Password must be at least 8 characters" });
      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const existing = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      logger.warn({ email: normalizedEmail }, "auth.register: email already in use");
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [user] = await db
      .insert(usersTable)
      .values({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "CLIENT",
      })
      .returning();

    // Regenerate session ID on privilege elevation to prevent session fixation.
    req.session.regenerate((regenErr) => {
      if (regenErr) {
        logger.error({ regenErr, userId: user.id }, "auth.register: session.regenerate failed");
        res.status(500).json({ error: "Registration failed" });
        return;
      }
      req.session.userId = user.id;
      req.session.save((saveErr) => {
        if (saveErr) {
          logger.error({ saveErr, userId: user.id }, "auth.register: session.save failed");
          res.status(500).json({ error: "Registration failed" });
          return;
        }
        logger.info({ userId: user.id, email: normalizedEmail }, "auth.register: success");
        const { password: _, ...safeUser } = user;
        res.status(201).json({ user: safeUser });
      });
    });
  } catch (err) {
    logger.error({ err }, "auth.register: unexpected error");
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email?.trim() || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Normalize: trim whitespace and lowercase so "  User@Example.com  " matches
    // the stored "user@example.com". Passwords are NOT trimmed — a password with
    // intentional leading/trailing spaces must match exactly what was registered.
    const normalizedEmail = normalizeEmail(email);

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    if (!user) {
      // Log the attempt without revealing whether the email exists in the DB
      logger.warn({ normalizedEmail }, "auth.login: no account found for email");
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logger.warn(
        { userId: user.id, normalizedEmail },
        "auth.login: password mismatch — possible autofill/whitespace issue or wrong password",
      );
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Regenerate session ID on privilege elevation to prevent session fixation.
    req.session.regenerate((regenErr) => {
      if (regenErr) {
        logger.error({ regenErr, userId: user.id }, "auth.login: session.regenerate failed");
        res.status(500).json({ error: "Login failed" });
        return;
      }
      req.session.userId = user.id;
      req.session.save((saveErr) => {
        if (saveErr) {
          logger.error({ saveErr, userId: user.id }, "auth.login: session.save failed");
          res.status(500).json({ error: "Login failed" });
          return;
        }
        logger.info({ userId: user.id, normalizedEmail }, "auth.login: success");
        const { password: _, ...safeUser } = user;
        res.json({ user: safeUser });
      });
    });
  } catch (err) {
    logger.error({ err }, "auth.login: unexpected error");
    res.status(500).json({ error: "Login failed" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Logout failed" });
      return;
    }
    res.clearCookie("sid");
    res.json({ ok: true });
  });
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, req.session.userId))
      .limit(1);

    if (!user) {
      req.session.destroy(() => {});
      res.status(401).json({ error: "User not found" });
      return;
    }

    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// POST /api/auth/forgot-password  (mocked — no email service yet)
router.post("/forgot-password", (_req, res) => {
  // Always return success to avoid revealing whether an email is registered
  res.json({
    message: "If that email exists in our system, a reset link has been sent.",
  });
});

export default router;
