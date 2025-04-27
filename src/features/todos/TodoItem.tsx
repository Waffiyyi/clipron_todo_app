import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';
import { StarIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../../services/api';
import { Todo } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from 'react-hot-toast';

interface TodoItemProps {
  todo: Todo;
  index: number;
}

export const TodoItem = ({ todo, index }: TodoItemProps) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleToggleComplete = async () => {
    try {
      await updateTodo({
        id: todo.id,
        todo: { completed: !todo.completed },
      }).unwrap();
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const handleToggleStarred = async () => {
    try {
      await updateTodo({
        id: todo.id,
        todo: { starred: !todo.starred },
      }).unwrap();
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  const handleSubmitEdit = async () => {
    try {
      await updateTodo({
        id: todo.id,
        todo: { title: editedTitle },
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
          className="bg-card rounded-lg shadow-sm p-4 flex items-center gap-4"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="h-5 w-5 rounded border-gray-300"
          />

          <div className="flex-1">
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitEdit()}
                />
                <Button onClick={handleSubmitEdit}>Save</Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex flex-col">
                <span
                  className={`text-foreground ${
                    todo.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {todo.title}
                </span>
                {todo.dueDate && (
                  <span className="text-sm text-muted-foreground">
                    Due: {format(new Date(todo.dueDate), 'PPP')}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleStarred}
              className={todo.starred ? 'text-yellow-500' : ''}
            >
              {todo.starred ? (
                <StarIconSolid className="h-5 w-5" />
              ) : (
                <StarIcon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-destructive"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
