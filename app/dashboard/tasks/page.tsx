import { auth } from "@/auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getTasks } from "@/app/lib/data";

export default async function Tasks() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session?.user?.id;
  const data = await getTasks(userId);

  return (
    <main className="p-4 md:p-6">
      <div className="w-full bg-[#fefffe] rounded-2xl">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
