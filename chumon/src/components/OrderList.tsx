// src/components/OrderList.tsx

import { OrderItem } from '../../lib/firestore';

interface OrderListProps {
  items: OrderItem[];
}

export default function OrderList({ items }: OrderListProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">全注文リスト (テスト表示)</h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="p-3 border rounded flex justify-between items-center">
            <span className="font-medium">{item.name}</span>
            <span className="text-lg font-bold text-blue-600">¥{item.price.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
