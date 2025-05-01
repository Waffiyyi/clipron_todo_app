import {Link} from 'react-router-dom';
import {Button} from './ui/Button';
import {useAuth} from "../hooks/useAuth.ts";

const NotFound = () => {
    const {generalTodoListId} = useAuth();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))]">
            <div className="text-center text-[hsl(var(--foreground))]">
                <h1 className="text-6xl font-bold ">404</h1 >
                <h2 className="mt-4 text-2xl font-semibold">Page
                                                            not
                                                            found</h2 >
                <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                    The page you're looking for doesn't exist or has been moved.
                </p >
                <Link
                    to={`/todos/General/${generalTodoListId}`}
                    className="mt-6 inline-block"
                >
                    <Button >Go back home</Button >
                </Link >
            </div >
        </div >
    );
};

export default NotFound;
