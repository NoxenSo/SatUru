import { Router, type Request } from "express";
import { db, messagesTable, projectsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAuth } from "../middleware/requireAuth";

// mergeParams: true allows access to :projectId from the parent router
const router = Router({ mergeParams: true });

type MessageParams = { projectId: string };
router.use(requireAuth);

async function assertProjectOwner(
  projectId: string,
  userId: string,
): Promise<boolean> {
  const [project] = await db
    .select({ id: projectsTable.id, userId: projectsTable.userId })
    .from(projectsTable)
    .where(eq(projectsTable.id, projectId))
    .limit(1);
  return !!project && project.userId === userId;
}

// GET /api/projects/:projectId/messages
router.get("/", async (req: Request<MessageParams>, res) => {
  try {
    const ok = await assertProjectOwner(req.params.projectId, req.session.userId!);
    if (!ok) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const messages = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.projectId, req.params.projectId))
      .orderBy(asc(messagesTable.createdAt));

    res.json({ messages });
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST /api/projects/:projectId/messages
router.post("/", async (req: Request<MessageParams>, res) => {
  try {
    const { content } = req.body as { content?: string };

    if (!content?.trim()) {
      res.status(400).json({ error: "Content is required" });
      return;
    }

    const ok = await assertProjectOwner(req.params.projectId, req.session.userId!);
    if (!ok) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const [message] = await db
      .insert(messagesTable)
      .values({
        content: content.trim(),
        sender: "CLIENT",
        projectId: req.params.projectId,
      })
      .returning();

    res.status(201).json({ message });
  } catch {
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
