import { useMemo } from "react";
import Table, { type Column } from "../components/ui/Table";
import { useLogout, useUser } from "../features/auth/hooks/useAuth";
import type { User } from "../features/auth/api/auth.types";
import { Button } from "../components/ui/Button";

function UsersPage() {
  const { data } = useUser();
  const { mutate: logout, isPending } = useLogout();

  const columns: Column<User>[] = useMemo(() => {
    return [
      {
        key: "name",
        header: "Name",
      },
      {
        key: "email",
        header: "Email",
      },
      {
        key: "created_at",
        header: "Created On",
        render: (value: string) => {
          return new Date(String(value)).toLocaleDateString("en-IN");
        },
      },
    ];
  }, []);

  return (
    <div>
      <div className="w-full shadow shadow-grey-500 flex justify-between items-center px-4 py-2">
        <span className="text-blue-600 text-xl font-semibold">Welcome!</span>
        <Button
          type="button"
          onClick={() => {
            logout();
          }}
        >
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
      <Table
        columns={columns}
        data={data || []}
        emptyMessage="No users available."
      />
    </div>
  );
}

export default UsersPage;
