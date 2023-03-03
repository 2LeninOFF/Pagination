import React from "react";
import Quality from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    _id,
    onDelete,
    onToggleBookmark
}) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>
                {qualities.map((quality) => (
                    <Quality {...quality} key={quality._id} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <Bookmark
                    status={bookmark}
                    onToggle={onToggleBookmark}
                    id={_id}
                />
            </td>
            <td>
                <button
                    key={_id}
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                        onDelete(_id);
                    }}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};
export default User;
