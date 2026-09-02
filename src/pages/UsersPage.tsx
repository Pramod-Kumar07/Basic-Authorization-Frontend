import { useCallback, useMemo } from "react";
import Table, { type Column } from "../components/ui/Table";
import { useLogout, useUser } from "../features/auth/hooks/useAuth";
import type { User } from "../features/auth/api/auth.types";
import { Button } from "../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { paymentorder } from "../features/payment/api/payment.api";
import { usePaymentCheckout } from "../features/payment/hooks/usePaymentCheckout";

function UsersPage() {
  const { data } = useUser();
  const { mutate: logout, isPending } = useLogout();
  const {
    handlePaymentCheckout,
    isPending: paymentverifypending,
    isSuccess,
  } = usePaymentCheckout();
  const { mutate: createOrder, isPending: creatingOrder } = useMutation({
    mutationFn: paymentorder,
  });

  const handlePayment = useCallback(
    (value: string) => {
      createOrder(
        {
          amount: 100000,
          currency: "INR",
          receipt: value,
        },
        {
          onSuccess: (data) => {
            handlePaymentCheckout(100000, data?.order?.id);
          },
        },
      );
    },
    [createOrder, handlePaymentCheckout],
  );

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
      {
        key: "id",
        header: "Payment",
        render: (value: string) => {
          return (
            <Button
              type="button"
              variant="outline"
              onClick={() => handlePayment(value)}
              disabled={creatingOrder || paymentverifypending}
            >
              {creatingOrder || paymentverifypending ? "Wait..." : "Pay ₹1000"}
            </Button>
          );
        },
      },
    ];
  }, [creatingOrder, handlePayment, paymentverifypending]);

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
      {isSuccess ? (
        <span className="text-green-500 text-sm font-medium my-2">
          Amount Paid successfully!
        </span>
      ) : null}
      <Table
        columns={columns}
        data={data || []}
        emptyMessage="No users available."
      />
    </div>
  );
}

export default UsersPage;
