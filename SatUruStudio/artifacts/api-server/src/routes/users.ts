import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();
router.use(requireAuth);

// GET /api/users/me
router.get("/me", async (req, res) => {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, req.session.userId!))
      .limit(1);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// PATCH /api/users/me
router.patch("/me", async (req, res) => {
  try {
    const { name, email, avatarUrl, currentPassword, newPassword } = req.body as {
      name?: string;
      email?: string;
      avatarUrl?: string | null;
      currentPassword?: string;
      newPassword?: string;
    };

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, req.session.userId!))
      .limit(1);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const updates: Partial<typeof usersTable.$inferInsert> & { updatedAt: Date } = {
      updatedAt: new Date(),
    };

    if (name?.trim()) updates.name = name.trim();
    if (email?.trim()) updates.email = email.trim().toLowerCase();
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

    if (currentPassword && newPassword) {
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) {
        res.status(400).json({ error: "Current password is incorrect" });
        return;
      }
      if (newPassword.length < 8) {
        res.status(400).json({ error: "New password must be at least 8 characters" });
        return;
      }
      updates.password = await bcrypt.hash(newPassword, 12);
    }

    const [updated] = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, req.session.userId!))
      .returning();

    const { password: _, ...safeUser } = updated;
    res.json({ user: safeUser });
  } catch {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
