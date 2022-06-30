export default function Loader(props) {
    return <div className={props.status ? "loader_holder active" : "loader_holder"}>
        <div className="loader loader_outerCircle"></div>
        <div className="loader loader_innerCircle"></div>
        <div className="loader loader_innermostCircle"></div>
    </div>
} 