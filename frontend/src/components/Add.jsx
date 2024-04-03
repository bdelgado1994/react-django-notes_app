import { useMutation, useQuery, useQueryClient } from "react-query"
import { addTask, editTask, getTaskById } from "../api/tasks"
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Field, Form } from 'formik';
import { AiFillPlusSquare } from "react-icons/ai";
import toast from 'react-hot-toast';
import Loader from "./Loader";

const Add = () => {
    const { taskId } = useParams()
    const navigate = useNavigate();
    //
    const mutation = taskId ? editTask : addTask
    const addTaskMutation = useMutation({
        mutationFn: mutation,
        onSuccess: () => {
            toast.success("Task Added Successfully")
            navigate("/")
        },
        onError: (error) => toast.error(error.message)
    })
    //
    const { data: task, isLoading, isError, error } = useQuery({
        queryKey: ['tasks', taskId],
        queryFn: () => taskId ? getTaskById(taskId) : null,
    })
    if (isLoading) return <Loader />;
    if (isError) return toast.error(error.message);
    return (
        <div className="mt-11">
            <h1 className="text-slate-200 text-center text-xl font-bold">{taskId ? "Edit" : "Add"}Tasks</h1>
            <Formik
                initialValues={taskId ? task : {
                    title: "",
                    completed: false
                }}
                onSubmit={(values) => addTaskMutation.mutate(values)}
            >
                <Form className="flex justify-center">
                    <Field className="rounded-lg p-1.5 m-5 outline-none" id="title" placeholder="Title" name="title" />
                    <Field type="checkbox" name="completed" id="completed" className="w-5" />
                    <button type="submit" className='text-slate-200 hover:text-white ml-5'><AiFillPlusSquare size={30} /></button>
                </Form>
            </Formik>
        </div>
    )
}

export default Add;