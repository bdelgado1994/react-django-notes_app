import { useQuery } from 'react-query';
import { getTaskById, dateFormated } from '../api/tasks';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import toast from 'react-hot-toast';
const TaskId = () => {
    const { taskId } = useParams();
    const { data: task, isLoading, isError, error } = useQuery({
        queryKey: ["taskId", taskId],
        queryFn: () => getTaskById(taskId)
    })
    if (isLoading) return <Loader />;
    if (isError) return toast.error(error.message);
    if (!task) return <h2 className="text-white">Not Found</h2>
    return (
        <>
            <div className='block rounded-lg bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white'>
                <h5 className='mb-2 text-xl font-medium leading-tight text-gray-950'>{task.title}</h5>
                <p className="mb-4 text-gray-950">
                    Creado: {dateFormated(task.created_at)}
                </p>
                <p className="mb-4 text-gray-950">
                    Editado: {dateFormated(task.updated_at)}
                </p>
            </div>
        </>
    )
}

export default TaskId