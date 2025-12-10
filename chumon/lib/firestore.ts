// chumon/lib/firestore.ts

import { db } from './firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
}

export async function getOrderItems(): Promise<OrderItem[]> {
  const itemsCollectionRef = collection(db, "orders");

  try {
    const snapshot = await getDocs(itemsCollectionRef);
    const items: OrderItem[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as OrderItem));

    return items;
  } catch (error) {
    console.error("Error fetching order items: ", error);
    return [];
  }
}

// データの追加
/*
export async function addOrderItem(itemData: Omit<OrderItem, 'id'>) {
    await addDoc(collection(db, "orders"), itemData);
}
*/
