import {useState} from 'react';
import {DragDropContext, Droppable, DropResult} from '@hello-pangea/dnd';
import {useGetTodosQuery} from '../../services/api';
import {TodoItem} from './TodoItem';
import {AddTodoForm} from './AddTodoForm';
import {TodoFilters} from './TodoFilters';
import {Todo} from '../../types';
import {useAuth} from "../../hooks/useAuth.ts";

type Filters = {
    status: string;
    priority: string;
    starred: boolean | null;
    search: string;
};
const TodoList = () => {
    const {user} = useAuth();
    const {data, isLoading, error} = useGetTodosQuery(user?.id || '');
    console.log("data", data);
    const [filters, setFilters] = useState<Filters>({
        status: 'all',
        priority: 'all',
        starred: null,
        search: '',
    });
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        // Handle reordering logic here
    };

    const filteredTodos = data?.filter((todo: Todo) => {
        const matchesSearch = todo.title
            .toLowerCase()
            .includes(filters.search.toLowerCase());
        const matchesStatus =
            filters.status === 'all' ||
            (filters.status === 'completed' && todo.completed) ||
            (filters.status === 'active' && !todo.completed);
        const matchesPriority =
            filters.priority === 'all' || todo.priority === filters.priority;
        console.log("todo.priority", todo.priority);
        console.log("filters.priority", filters.priority);
        const matchesStarred =
            filters.starred === null || todo.starred === filters.starred;

        return matchesSearch && matchesStatus && matchesPriority && matchesStarred;
    });

    if (isLoading) return <div >Loading...</div >;
    if (error) return <div >Error loading todos</div >;

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-foreground mb-8">My
                                                                        Tasks</h1 >

                <AddTodoForm />

                <TodoFilters filters={filters} setFilters={setFilters}/>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="todos">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4 mt-6"
                            >
                                {filteredTodos?.map((todo: Todo, index: number) => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        index={index}
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
