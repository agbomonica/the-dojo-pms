import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";

// Styles
import "./Create.css";

// categories can be declard outside create component
const categories = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "sales", label: "Sales" },
  { value: "devops", label: "DevOps" },
];

function Create() {
  // Form input fields
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const options =
      documents &&
      documents.map((user) => {
        return { value: user, label: user.displayName };
      });

    setUsers(options);
  }, [documents]);

  const handleSubmit = function (e) {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a project category");

      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assigned a project to at least 1 user");
      return;
    }

    console.log(name, details, dueDate, category, assignedUsers);
  };

  return (
    <div className="create__project">
      <h2 className="page-title">Create a new project</h2>
      <form className="create__project-form" onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            required
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>

        <label>
          <span>Project date:</span>
          <input
            required
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label>
          <span>Category:</span>
          {/* onChange event returns the changed option object when fired */}
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
            isMulti
            options={users}
            onChange={(option) => setAssignedUsers(option)}
          />
        </label>

        {formError && <div className="error">{formError}</div>}

        <button className="btn">Add project</button>
      </form>
    </div>
  );
}

export default Create;
