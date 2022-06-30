export default function Toast(props) {

    return <div
        className={props.activeStatus
            ? "toast_container active"
            : "toast_container"}>
        <p className="message">{props.message}</p>

    </div>
}