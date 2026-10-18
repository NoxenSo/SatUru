import { Router } from "express";
import { db, projectsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();
router.use(requireAuth);

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.userId, req.session.userId!))
      .orderBy(desc(projectsTable.createdAt));
    res.json({ projects });
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, req.params.id))
      .limit(1);

    if (!project || project.userId !== req.session.userId) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json({ project });
  } catch {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// POST /api/projects
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body as {
      title?: string;
      description?: string;
    };

    if (!title?.trim()) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const [project] = await db
      .insert(projectsTable)
      .values({
        title: title.trim(),
        description: description?.trim() || null,
        status: "NEW",
        userId: req.session.userId!,
      })
      .returning();

    res.status(201).json({ project });
  } catch {
    res.status(500).json({ error: "Failed to create project" });
  }
});

export default router;
