import { useToast, Toast } from "../context/ToastContext";

const ToastList = () => {
	const { toasts, removeToast } = useToast();

	return (
		<div className="toast toast-center mb-10">
			{toasts.map((toast: Toast) => (
				<div key={toast.id} className={`alert alert-${toast.type} bg-btnBlue`}>
					<div>
						<span>{toast.message}</span>
						<button className="ml-4" onClick={() => removeToast(toast.id)}>
							×
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ToastList;
