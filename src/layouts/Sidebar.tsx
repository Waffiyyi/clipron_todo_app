import React, {useState} from 'react';
import {cn} from '../utils/cn';
import {
    InboxIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import {Button} from '../components/ui/Button';
import {useAuth} from "../hooks/useAuth.ts";
import {ArrowLeftEndOnRectangleIcon as LogoutIcon, Bars3BottomRightIcon as ListIcon} from "@heroicons/react/16/solid";
import {toast} from "react-hot-toast";
import {useAddTodoListMutation, useGetTodoListQuery} from "../services/api.ts";
import {Input} from "../components/ui/Input.tsx";
import {useNavigate} from "react-router-dom";

interface NavItemProps {
    icon: React.ReactElement<{ className?: string }>;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({icon, label, active, onClick}) => {
    return (
        <button
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left",
                "transition-colors duration-200",
                "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
                active ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-medium" : "text-[hsl(var(--foreground))]"
            )}
            onClick={onClick}
        >
            {React.cloneElement(icon, {className: "h-6 w-6"})}
            <span >{label}</span >
        </button >
    );
};

export const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = React.useState('My Tasks');
    const {logout, user} = useAuth();
    const {data, isLoading, error} = useGetTodoListQuery(user?.id || '');
    console.log(error,"error");
    const [addTodoList] = useAddTodoListMutation();
    const [name, setName] = useState('');
    const [creatingNewList, setCreatingNewList] = useState(false);
    const navigate = useNavigate();

    const handleNavClick = (item: string) => {
        setActiveItem(item);
    };
    console.log("data", data);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await addTodoList({
                name,
                userId: user?.id,
            }).unwrap();
            setName('');
            setCreatingNewList(false);
            toast.success('Todo List created successfully');
        } catch (error) {
            console.error(error)
            toast.error('Failed to add todo list');
        }
    };

    const handleCancel = () => {
        setCreatingNewList(false);
        setName('');
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="p-4 border-b border-[hsl(var(--border))]">
                <h2 className="text-xl font-bold mb-6 text-[hsl(var(--foreground))]">Todo
                                                                                     App</h2 >
                <nav className="flex flex-col justify-between gap-2 min-h-50">
                    <div >
                        <NavItem
                            icon={<InboxIcon />}
                            label="My Tasks"
                            active={activeItem === 'My Tasks'}
                            onClick={() => handleNavClick('My Tasks')}
                        />
                        {/*<NavItem*/}
                        {/*    icon={<StarIcon />}*/}
                        {/*    label="Important"*/}
                        {/*    active={activeItem === 'Important'}*/}
                        {/*    onClick={() => handleNavClick('Important')}*/}
                        {/*/>*/}
                        {/*<NavItem*/}
                        {/*    icon={<CalendarIcon />}*/}
                        {/*    label="Planned"*/}
                        {/*    active={activeItem === 'Planned'}*/}
                        {/*    onClick={() => handleNavClick('Planned')}*/}
                        {/*/>*/}
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

            <div className="flex-1 overflow-auto p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-[50vh]">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[hsl(var(--primary))] border-t-transparent"/>
                    </div >
                ) : error ? (
                    <p className="text-center text-sm text-red-500">Error
                                                                    loading todo
                                                                    list</p >
                ) : (
                    <div className="flex flex-col gap-2">
                        {data?.map((item) => (
                            <NavItem
                                key={item.id}
                                icon={<ListIcon />}
                                label={item.name}
                                active={activeItem === item.name}
                                onClick={() => {
                                    handleNavClick(item.name)
                                    navigate(`/todos/${item.name}/${item.id}`)
                                }
                                }
                            />
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