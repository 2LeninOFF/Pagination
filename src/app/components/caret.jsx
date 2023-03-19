import React from "react";
import PropTypes from "prop-types";

const Caret = ({ statusCaret }) => {
    return (<i className={"bi bi-caret" + (statusCaret === "asc" ? "-up-fill" : "-down-fill")}></i>);
};

Caret.propTypes = {
    statusCaret: PropTypes.string.isRequired
};

export default Caret;
