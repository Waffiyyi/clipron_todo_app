import React, {useState} from 'react';
import {toast} from 'react-hot-toast';
import {useAddTodoMutation} from '../../services/api';
import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import {useAuth} from "../../hooks/useAuth.ts";

export const AddTodoForm = () => {
    const {user} = useAuth();
    const [addTodo] = useAddTodoMutation();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState<string | undefined>(undefined);
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await addTodo({
                title,
                dueDate: dueDate || undefined,
                priority,
                completed: false,
                starred: false,
                userId: user?.id,
            }).unwrap();
            setTitle('');
            setDueDate('');
            setPriority('MEDIUM');
            toast.success('Todo added successfully');
        } catch (error) {
            toast.error('Failed to add todo');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="flex gap-4">
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1"
                />
                <Input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-60"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                    className="rounded-md border border-input bg-background px-3 py-2"
                >
                    <option value="LOW">Low</option >
                    <option value="MEDIUM">Medium</option >
                    <option value="HIGH">High</option >
                </select >
                <Button type="submit">Add Task</Button >
            </div >
        </form >
    );
};
