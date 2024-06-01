import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NoteCard = ({ title, id }) => {
  return (
    <>
      <Link to={`/note-details/${id}`}>
        <div className="flex flex-col gap-4 justify-center items-center rounded-md shadow-md bg-white m-4">
          <div className="text-3xl font-bold text-center p-2">
            <h1>{title}</h1>
          </div>
        </div>
      </Link>
    </>
  );
};
NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
};
export default NoteCard;
