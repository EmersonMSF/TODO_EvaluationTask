const ErrorMessage = (props) => {
    return <div className={props.status ? "error_message active" : "error_message"}>
        <p>{props.message}</p>
    </div>
}

export default ErrorMessage