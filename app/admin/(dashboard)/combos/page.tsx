import { notFound } from "next/navigation";

// Combo Offers admin section was removed per request — the underlying
// homepage section, nav link, and dashboard card are all gone. This route
// file can't be deleted from here, so it's disabled rather than left
// reachable.
export default function AdminCombosPage() {
  notFound();
}
