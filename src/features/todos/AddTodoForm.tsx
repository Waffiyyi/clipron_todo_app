import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAddTodoMutation } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth.ts';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const AddTodoForm = () => {
    const { user } = useAuth();
    const [addTodo] = useAddTodoMutation();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
    const { id } = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await addTodo({
                title,
                dueDate: dueDate ? dueDate.toISOString() : undefined,
                priority,
                completed: false,
                starred: false,
                userId: user?.id,
                listId: id,
            }).unwrap();
            setTitle('');
            setDueDate(null);
            setPriority('MEDIUM');
            toast.success('Todo added successfully');
        } catch (error) {
            toast.error('Failed to add todo');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full md:flex-1"
                />

                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select due date"
                    customInput={<Input className="w-full md:w-60" />}
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                    className="w-full md:w-40 rounded-md border text-[hsl(var(--foreground))] bg-background p-2 outline-none"
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                <Button type="submit" className="w-full md:w-auto">
                    Add Task
                </Button>
            </div>
        </form>
    );
};