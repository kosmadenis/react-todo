import { formatDistanceToNow } from "date-fns";

function Task({ data }) {
  const { creationTime, description, completed, editing } = data;

  let className = "";
  let input;

  if (editing) {
    className += " editing";

    input = <input type="text" className="edit" value={description} />;
  }

  if (completed) {
    className += " completed";
  }

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">{formatDistanceToNow(creationTime)}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {input}
    </li>
  );
}

export default Task;
