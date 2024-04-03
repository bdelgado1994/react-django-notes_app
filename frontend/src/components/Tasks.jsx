import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAllTasks } from "../api/tasks";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Tasks = () => {
    //const queryClient = useQueryClient();
    const {
        data: tasks,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: getAllTasks,
    });
    if (isLoading) return <Loader />;
    if (isError) return toast.error(error.message);
    return (
        <>
            {tasks.map((task) => (
                <div className="bg-sky-950 p-4 m-4  rounded-md" key={task.id}>
                    <header className="flex justify-between">
                        <p className="m-2 text-slate-200 ">{task.title}</p>

                        <p className="text-slate-200 cursor-pointer">
                            {task.completed ? (
                                <ImCheckboxChecked size={20} />
                            ) : (
                                <ImCheckboxUnchecked size={20} />
                            )}
                        </p>
                    </header>

                    <div className="flex justify-center">
                        <Link
                            className="text-slate-200 hover:text-white transition-colors m-3"
                            to={`${task.id}`}
                        >
                            <AiFillEye size={30} />
                        </Link>

                        <Link
                            className="text-cyan-700 hover:text-cyan-200 transition-colors m-3"
                            to={`/edit/${task.id}`}
                        >
                            <AiFillEdit size={30} />
                        </Link>

                        <button
                            className="text-red-700 hover:text-red-200 transition-colors mb-4 m-3"
                            type="button"
                        >
                            <AiFillDelete size={30} />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Tasks;
