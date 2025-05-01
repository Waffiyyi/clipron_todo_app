import {useMemo, useState} from 'react';
import {DragDropContext, Droppable, DropResult} from '@hello-pangea/dnd';
import {ExclamationCircleIcon} from '@heroicons/react/24/outline';
import {cn} from '../../utils/cn';
import {AddTodoForm} from './AddTodoForm';
import {TodoFilters} from './TodoFilters';
import {TodoItem} from './TodoItem';
import {Todo} from '../../types';
import {useGetTodosQuery} from '../../services/api';
import {useAuth} from "../../hooks/useAuth.ts";
import {useParams} from "react-router-dom";
import {useLayout} from "../../hooks/useLayout.ts";
import {Bars3BottomRightIcon as ListIcon, TableCellsIcon as GridIcon} from "@heroicons/react/16/solid";
import {Button} from "../../components/ui/Button.tsx";
import {useTodoOrder} from '../../hooks/useTodoOrder';

const TodoList = () => {
    const {user} = useAuth();
    const {id, name} = useParams();
    const {data: initialData, isLoading, error} = useGetTodosQuery({
        userId: user?.id || '',
        listId: id || ''
    });
    const {layout, toggleLayout} = useLayout();
    const {
        orderedTodos,
        reorderTodos
    } = useTodoOrder(id || '', initialData || []);

    const [filters, setFilters] = useState({
        status: 'all',
        priority: 'all',
        starred: null as boolean | null,
        search: '',
    });

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        reorderTodos(result.source.index, result.destination.index);
    };

    const filteredTodos = useMemo(() => {
        if (!orderedTodos) return [];

        return orderedTodos.filter((todo: Todo) => {
            const matchesSearch = todo.title.toLowerCase().includes(filters.search.toLowerCase());
            const matchesStatus =
                filters.status === 'all' ||
                (filters.status === 'completed' && todo.completed) ||
                (filters.status === 'active' && !todo.completed);
            const matchesPriority =
                filters.priority === 'all' || todo.priority === filters.priority;
            const matchesStarred =
                filters.starred === null || todo.starred === filters.starred;

            return matchesSearch && matchesStatus && matchesPriority && matchesStarred;
        });
    }, [orderedTodos, filters]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[hsl(var(--primary))] border-t-transparent"/>
            </div >
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-[hsl(var(--muted-foreground))]">
                <ExclamationCircleIcon className="h-12 w-12 mb-4"/>
                <p >Error loading todos</p >
            </div >
        );
    }

    return (
        <div
            className="w-full max-w-5xl p-2 flex flex-col h-[calc(100vh-100px)]"
        >
            <div className="flex-grow-0">
                <TodoFilters filters={filters} setFilters={setFilters}/>
                <div className={'mt-10'}>
                    <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-6 mt-6">{name}</h1 >
                    <AddTodoForm />
                </div >
                <div className="flex justify-end mb-4">
                    <Button
                        type={'button'}
                        size={'icon'}
                        variant={"ghost"}
                        className="text-[hsl(var(--foreground))] cursor-pointer w-8 h-8"
                        onClick={toggleLayout}
                    >
                        {layout === 'list' ? <ListIcon /> : <GridIcon />}
                    </Button >
                </div >
            </div >

            <div className="flex-grow overflow-y-auto">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="todos">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={cn(
                                    "transition-all duration-200 ease-in-out",
                                    layout === 'grid'
                                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
                                        : "flex flex-col space-y-3 pb-4"
                                )}
                            >
                                {filteredTodos?.map((todo: Todo, index: number) => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        index={index}
                                        layout={layout}
                                    />
                                ))}
                                {provided.placeholder}
                            </div >
                        )}
                    </Droppable >
                </DragDropContext >
            </div >
        </div >
    );
};

export default TodoList;