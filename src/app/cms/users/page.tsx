import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CmsNav } from "@/components/cms/CmsNav";
import { CollectionForm } from "@/components/cms/CollectionForm";
import { getUsers } from "@/cms/store";

export const metadata: Metadata = { title: "Users", robots: { index: false, follow: false } };

export default function CmsUsersPage() {
  const users = getUsers();
  return (
    <SiteShell title="Users">
      <main id="main" className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <CmsNav current="/cms/users" />
        <h1 className="mb-8 font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase tracking-tight">
          Users
        </h1>
        <CollectionForm
          endpoint="/api/cms/users"
          submitLabel="Save user"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            {
              name: "role",
              label: "Role",
              type: "select",
              options: [
                { value: "admin", label: "Admin" },
                { value: "editor", label: "Editor" },
                { value: "author", label: "Author" },
                { value: "reviewer", label: "Reviewer" },
              ],
            },
          ]}
        />
        <table className="mt-10 w-full text-left text-sm">
          <thead className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.14em] text-muted">
            <tr className="border-b border-[var(--line)]">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[var(--line)]">
                <td className="py-3">{u.name}</td>
                <td className="py-3 text-muted">{u.email}</td>
                <td className="py-3 text-radio">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </SiteShell>
  );
}
