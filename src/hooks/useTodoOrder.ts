import {useState, useEffect, useMemo} from 'react';
import {Todo} from "../types";

type TodoOrder = Record<string, string[]>;

const getSavedOrder = (listId: string): string[] | null => {
    if (typeof window === 'undefined') return null;
    const savedOrder = localStorage.getItem('todoOrder');
    if (!savedOrder) return null;

    const parsed: TodoOrder = JSON.parse(savedOrder);
    return parsed[listId] || null;
};

const saveOrder = (listId: string, order: string[]) => {
    if (typeof window === 'undefined' || !order.length) return;

    const currentOrder: TodoOrder = JSON.parse(localStorage.getItem('todoOrder') || '{}');
    currentOrder[listId] = order;
    localStorage.setItem('todoOrder', JSON.stringify(currentOrder));
};

const mergeOrders = (savedIds: string[] | null, todos: Todo[]): string[] => {
    if (!savedIds) return todos.map(todo => todo.id);

    const validSavedIds = savedIds.filter(id =>
        todos.some(todo => todo.id === id)
    );
    const newTodoIds = todos
        .filter(todo => !validSavedIds.includes(todo.id))
        .map(todo => todo.id);

    return [...validSavedIds, ...newTodoIds];
};

export const useTodoOrder = (listId: string, initialTodos: Todo[] = []) => {
    const [order, setOrder] = useState<string[]>(() =>
        mergeOrders(getSavedOrder(listId), initialTodos)
    );

    useEffect(() => {
        const newOrder = mergeOrders(getSavedOrder(listId), initialTodos);
        setOrder((prevOrder) => {
            const hasChanged = JSON.stringify(prevOrder) !== JSON.stringify(newOrder);
            return hasChanged ? newOrder : prevOrder;
        });
    }, [listId, initialTodos]);

    useEffect(() => {
        saveOrder(listId, order);
    }, [order, listId]);

    const orderedTodos = useMemo(() => {
        if (!order.length) return initialTodos;

        const todoMap = new Map(initialTodos.map(todo => [todo.id, todo]));
        return order.map(id => todoMap.get(id)).filter(Boolean) as Todo[];
    }, [order, initialTodos]);

    const reorderTodos = (sourceIndex: number, destinationIndex: number) => {
        setOrder(prev => {
            const newOrder = [...prev];
            const [movedId] = newOrder.splice(sourceIndex, 1);
            newOrder.splice(destinationIndex, 0, movedId);
            return newOrder;
        });
    };

    return {orderedTodos, reorderTodos};
};