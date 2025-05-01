import {useState} from 'react';
import {Draggable} from '@hello-pangea/dnd';
import {format} from 'date-fns';
import {StarIcon, PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import {StarIcon as StarIconSolid} from '@heroicons/react/24/solid';
import {useUpdateTodoMutation, useDeleteTodoMutation} from '../../services/api';
import {Todo} from '../../types';
import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import {toast} from 'react-hot-toast';
import {cn} from '../../utils/cn';

interface TodoItemProps {
    todo: Todo;
    index: number;
    layout: 'list' | 'grid';
}

export const TodoItem = ({todo, index, layout}: TodoItemProps) => {
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleToggleComplete = async () => {
        try {
            await updateTodo({
                id: todo.id,
                todo: {completed: !todo.completed},
            }).unwrap();
        } catch (error) {
            toast.error('Failed to update todo');
        }
    };

    const handleToggleStarred = async () => {
        try {
            await updateTodo({
                id: todo.id,
                todo: {starred: !todo.starred},
            }).unwrap();
        } catch (error) {
            toast.error('Failed to update starred status');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id).unwrap();
        } catch (error) {
            toast.error('Failed to delete todo');
        }
    };

    const handleSubmitEdit = async () => {
        try {
            await updateTodo({
                id: todo.id,
                todo: {title: editedTitle},
            }).unwrap();
            setIsEditing(false);
            toast.success('Todo updated successfully');
        } catch (error) {
            toast.error('Failed to update todo');
        }
    };

    return (
        <Draggable draggableId={String(todo.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                        "group bg-[hsl(var(--card))]",
                        "hover:bg-[hsl(var(--accent))] transition-all duration-200",
                        "rounded-lg border border-[hsl(var(--border))]",
                        "shadow-sm hover:shadow-md",
                        layout === 'grid'
                            ? "p-4 flex flex-col h-[200px]"
                            : "p-4 flex items-start gap-4"
                    )}
                >
                    <div
                        className={cn(
                            "flex items-start",
                            layout === 'grid' ? "flex-col space-y-3 w-full" : "gap-4 w-full"
                        )}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={handleToggleComplete}
                            className="h-5 w-5 rounded border-[hsl(var(--border))] mt-1 flex-shrink-0"
                        />

                        <div
                            className={cn(
                                "flex-1 min-w-0",
                                layout === 'grid' && "w-full"
                            )}
                        >
                            {isEditing ? (
                                <div className="flex gap-2 flex-wrap">
                                    <Input
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === 'Enter') handleSubmitEdit();
                                        }}
                                        className="flex-1 min-w-[180px]"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleSubmitEdit}
                                            size="sm"
                                        >Save</Button >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button >
                                    </div >
                                </div >
                            ) : (
                                <div className="space-y-1">
                                    <p
                                        className={cn(
                                            "text-[hsl(var(--foreground))]",
                                            layout === 'grid' ? "line-clamp-2" : "line-clamp-1",
                                            todo.completed && "line-through text-[hsl(var(--muted-foreground))]"
                                        )}
                                    >
                                        {todo.title}
                                    </p >
                                    {todo.dueDate && (
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            Due: {format(todo.dueDate, 'MMM d, h:mm a')}
                                        </p >
                                    )}
                                </div >
                            )}
                        </div >

                        <div
                            className={cn(
                                "flex items-center gap-1",
                                layout === 'grid' ? "mt-auto w-full justify-end" : "flex-shrink-0"
                            )}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleToggleStarred}
                                className={cn(
                                    "h-8 w-8 opacity-70 group-hover:opacity-100",
                                    todo.starred && "text-[hsl(var(--primary))] opacity-100"
                                )}
                            >
                                {todo.starred ? (
                                    <StarIconSolid className="h-4 w-4"/>
                                ) : (
                                    <StarIcon className="h-4 w-4"/>
                                )}
                            </Button >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsEditing(true)}
                                className="h-8 w-8 opacity-70 group-hover:opacity-100"
                            >
                                <PencilIcon className="h-4 w-4"/>
                            </Button >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleDelete}
                                className="h-8 w-8 opacity-70 group-hover:opacity-100 text-[hsl(var(--destructive))]"
                            >
                                <TrashIcon className="h-4 w-4"/>
                            </Button >
                        </div >
                    </div >
                </div >
            )}
        </Draggable >
    );
};