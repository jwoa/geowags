import { requireAuth } from "@/lib/auth";
import { PageForm } from "../PageForm";

export default async function NewPagePage() {
  await requireAuth();
  return <PageForm isNew />;
}

