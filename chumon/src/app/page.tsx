// chumon/src/app/page.tsx

import { getOrderItems } from "../../lib/firestore";
import OrderList from "../components/OrderList";

export default async function DashboardPage() {
  const orderItems = await getOrderItems();
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <h1 className="text-3xl font-bold mb-6">ダッシュボード (注文概要)</h1>

      {orderItems.length > 0 ? (
        <OrderList items={orderItems} />
      ) : (
        <p className="text-gray-500">現在、注文データはありません。</p>
      )}

    </main>
  );
}
