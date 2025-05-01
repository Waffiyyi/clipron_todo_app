import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import React from 'react';

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
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    className="w-full md:flex-1 rounded-full max-w-80"
                />
            </div >

            <div className="flex flex-wrap justify-start md:justify-between gap-4 ">
                <div className={'flex flex-col md:flex-row gap-2'}>
                    {/* Status Filters */}
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
                            setFilters((prev) => ({
                                ...prev,
                                status: 'completed'
                            }))
                        }
                    >
                        Completed
                    </Button >
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



                <div className={'flex flex-col md:flex-row gap-2'}>
                    {/* Priority Filters */}
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
                        High
                    </Button >
                    <Button
                        variant={filters.priority === 'MEDIUM' ? 'default' : 'outline'}
                        onClick={() =>
                            setFilters((prev) => ({...prev, priority: 'MEDIUM'}))
                        }
                    >
                        Medium
                    </Button >
                    <Button
                        variant={filters.priority === 'LOW' ? 'default' : 'outline'}
                        onClick={() =>
                            setFilters((prev) => ({...prev, priority: 'LOW'}))
                        }
                    >
                        Low
                    </Button >
                </div>


            </div >
        </div >
    );
};