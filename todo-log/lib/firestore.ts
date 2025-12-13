// lib/firestore.ts

import { db } from './firebase/firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  createdAt: any;
}

export const getTodayStr = () => {
  return new Date().toLocaleDateString('sv-SE');
};

export async function getTodosByDate(dateStr: string): Promise<TodoItem[]> {
  const todosRef = collection(db, "todos");

  const q = query(todosRef, where("date", "==", dateStr));

  try {
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as TodoItem));

    return items;
  } catch (error) {
    console.error("Error fetching todos: ", error);
    return [];
  }
}

export async function addTodo(text: string) {
  try {
    const todosRef = collection(db, "todos");
    const today = getTodayStr();

    const inputData = {
      text: text,
      completed: false,
      date: today,
      createdAt: serverTimestamp(),
    };
    await addDoc(todosRef, inputData);
  } catch (error) {
    console.error("Firestoreへの書き込みに失敗しました:", error);
  }
}

export async function toggleTodoComplete(id: string, currentStatus: boolean) {
  const todoRef = doc(db, "todos", id);
  await updateDoc(todoRef, {
    completed: !currentStatus
  });
}

export async function deleteTodo(id: string) {
  try {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error("Error deleting todo: ", error);
  }
}

export async function getActiveDates(): Promise<string[]> {
  const todosRef = collection(db, "todos");
  try {
    const snapshot = await getDocs(todosRef);

    const dates = snapshot.docs.map(doc => doc.data().date as string);
    const uniqueDates = Array.from(new Set(dates));

    return uniqueDates.sort((a, b) => b.localeCompare(a));
  } catch (error) {
    console.error("日付一覧の取得に失敗しました:", error);
    return [];
  }
}
