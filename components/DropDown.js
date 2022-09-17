
import "bootstrap/dist/css/bootstrap.css";



const dropDownn = ()=> {
  return (
    <>
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown Button
      </button>

      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
    </>
  );
};

export default dropDownn;
