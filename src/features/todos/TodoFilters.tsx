import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import React from "react";

interface TodoFiltersProps {
    filters: {
        status: string;
        priority: string;
        starred: boolean | null;
        search: string;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            status: string;
            priority: string;
            starred: boolean | null;
            search: string;
        }>
    >;
}

export const TodoFilters = ({filters, setFilters}: TodoFiltersProps) => {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            search: e.target.value
                        }))
                    }
                    className="flex-1"
                />
            </div >

            <div className="flex gap-2 flex-wrap">
                <Button
                    variant={filters.status === 'all' ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({...prev, status: 'all'}))
                    }
                >
                    All
                </Button >
                <Button
                    variant={filters.status === 'active' ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({...prev, status: 'active'}))
                    }
                >
                    Active
                </Button >
                <Button
                    variant={filters.status === 'completed' ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({...prev, status: 'completed'}))
                    }
                >
                    Completed
                </Button >

                <div className="h-6 w-px bg-border mx-2"/>

                <Button
                    variant={filters.priority === 'all' ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({...prev, priority: 'all'}))
                    }
                >
                    All Priorities
                </Button >
                <Button
                    variant={filters.priority === 'HIGH' ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({...prev, priority: 'HIGH'}))
                    }
                >
                    High Priority
                </Button >
                <Button
                    variant={filters.priority === 'MEDIUM' ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({...prev, priority: 'MEDIUM'}))
                    }
                >
                    Medium Priority
                </Button >
                <Button
                    variant={filters.priority === 'LOW' ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({...prev, priority: 'LOW'}))
                    }
                >
                    Low Priority
                </Button >

                <div className="h-6 w-px bg-border mx-2"/>

                <Button
                    variant={filters.starred === true ? 'default' : 'outline'}
                    onClick={() =>
                        setFilters((prev) => ({
                            ...prev,
                            starred: prev.starred === true ? null : true,
                        }))
                    }
                >
                    Starred
                </Button >
            </div >
        </div >
    );
};
