import React, {useState} from 'react';
import {
    InboxIcon,
    PlusIcon,
    EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import {Button} from '../../ui/Button.tsx';
import {useAuth} from "../../../hooks/useAuth.ts";
import {
    ArrowLeftEndOnRectangleIcon as LogoutIcon,
    Bars3BottomRightIcon as ListIcon
} from "@heroicons/react/16/solid";
import {toast} from "react-hot-toast";
import {
    useAddTodoListMutation,
    useDeleteTodoListMutation,
    useGetTodoListQuery
} from "../../../services/api.ts";
import {Input} from "../../ui/Input.tsx";
import {useNavigate} from "react-router-dom";
import {NavItem} from "./NavItem";
import LoaderOrError from "../../LoaderOrError.tsx";


export const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState('My Tasks');
    const {logout, user} = useAuth();
    const {data, isLoading, error} = useGetTodoListQuery(user?.id || '');
    const [addTodoList] = useAddTodoListMutation();
    const [deleteList] = useDeleteTodoListMutation();
    const [name, setName] = useState('');
    const [creatingNewList, setCreatingNewList] = useState(false);
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleNavClick = (item: string) => {
        setActiveItem(item);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await addTodoList({name, userId: user?.id}).unwrap();
            setName('');
            setCreatingNewList(false);
            toast.success('Todo List created successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add todo list');
        }
    };

    const handleCancel = () => {
        setCreatingNewList(false);
        setName('');
    };

    const handleDeleteTodoList = async (id: string) => {
        try {
            await deleteList(id).unwrap();
            toast.success('List deleted');
            setMenuOpenId(null);
        } catch (error: any) {
            toast.error(error.data?.errorMessage || 'Failed to delete list');
            console.error(error);
        }
    }

    return (
        <div className="max-h-screen flex flex-col h-screen min-h-0">
            <div className="p-4 border-b border-[hsl(var(--border))]">
                <nav className="flex flex-col justify-between gap-2 min-h-50">
                    <div >
                        <NavItem
                            icon={<InboxIcon />}
                            label="My Tasks"
                            active={activeItem === 'My Tasks'}
                            onClick={() => handleNavClick('My Tasks')}
                        />
                    </div >
                    <div >
                        <NavItem
                            icon={<LogoutIcon />}
                            label="Logout"
                            active={activeItem === 'Logout'}
                            onClick={logout}
                        />
                    </div >
                </nav >
            </div >

            <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {(isLoading || error) ? (
                    <LoaderOrError
                        isLoading={isLoading}
                        error={!!error}
                        message="Error loading todo list"
                        compact
                    />
                ) : (
                    <div className="flex flex-col gap-2">
                        {data?.map((item) => (
                            <div
                                key={item.id}
                                className="relative flex items-center justify-between rounded-lg hover:bg-[hsl(var(--accent))]"
                            >
                                <NavItem
                                    icon={<ListIcon />}
                                    label={item.name}
                                    active={activeItem === item.name}
                                    onClick={() => {
                                        handleNavClick(item.name);
                                        navigate(`/todos/${item.name}/${item.id}`);
                                    }}
                                />
                                <div
                                    className="relative pr-2"
                                    tabIndex={0}
                                    onBlur={() => setMenuOpenId(null)}
                                >
                                    <Button
                                        variant={"ghost"}
                                        size={"icon"}
                                        className="p-1 rounded-full hover:bg-[hsl(var(--muted))]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMenuOpenId(menuOpenId === item.id ? null : item.id);
                                        }}
                                    >
                                        <EllipsisVerticalIcon className="h-5 w-5 text-[hsl(var(--muted-foreground))]"/>
                                    </Button >
                                    {menuOpenId === item.id && (
                                        <div className="absolute right-0 z-10 mt-1 w-28 rounded-md shadow-lg bg-white border border-gray-200">
                                            <button
                                                className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                                                onClick={() => handleDeleteTodoList(item.id)}
                                            >
                                                Delete
                                            </button >
                                        </div >
                                    )}
                                </div >
                            </div >
                        ))}
                    </div >
                )}
            </div >

            <div className="p-4 border-t border-[hsl(var(--border))]">
                {creatingNewList ? (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter list name..."
                            className="border rounded-md p-2 text-sm text-[hsl(var(--foreground))] bg-transparent border-[hsl(var(--border))]"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    handleCancel();
                                }
                            }}
                        />
                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="flex-1 border bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
                            >
                                Save
                            </Button >
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1 border bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--secondary))]"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button >
                        </div >
                    </form >
                ) : (
                    <Button
                        onClick={() => setCreatingNewList(true)}
                        className="w-full flex items-center justify-center gap-2 bg-[hsl(var(--primary-foreground))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary))]"
                    >
                        <PlusIcon className="h-4 w-4"/>
                        <span >New List</span >
                    </Button >
                )}
            </div >
        </div >
    );
};