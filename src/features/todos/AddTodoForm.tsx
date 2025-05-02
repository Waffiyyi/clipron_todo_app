import React, {useState} from 'react';
import {toast} from 'react-hot-toast';
import {useAddTodoMutation} from '../../services/api';
import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import {useAuth} from '../../hooks/useAuth.ts';
import {useParams} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MiniLoader from "../../components/MiniLoader.tsx";

export const AddTodoForm = () => {
    const {user} = useAuth();
    const [addTodo] = useAddTodoMutation();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
    const {id} = useParams();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        if (dueDate && dueDate < new Date()) {
            toast.error('Due date cannot be in the past');
            return;
        }
        setLoading(true)
        try {
            const localDueDate = dueDate ? new Date(dueDate.getTime() - dueDate.getTimezoneOffset() * 60000) : undefined;
            await addTodo({
                title,
                dueDate: localDueDate ? localDueDate.toISOString() : undefined,
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
        }finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full md:flex-1 md:w-60"
                />

                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select due date"
                    customInput={<Input className="w-full md:w-60"/>}
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                    className="w-full md:w-60 rounded-md border text-[hsl(var(--foreground))] bg-background p-2 outline-none"
                >
                    <option value="LOW">Low</option >
                    <option value="MEDIUM">Medium</option >
                    <option value="HIGH">High</option >
                </select >

                <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <MiniLoader size={20} />
                        </div>
                    ) : (
                        'Add Task'
                    )}
                </Button >
            </div >
        </form >
    );
};