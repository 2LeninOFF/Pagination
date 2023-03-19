import React from "react";
import PropTypes from "prop-types";

const Caret = ({ statusCaret, selectCaret, focusCaret }) => {
    if (selectCaret === focusCaret) {
        return (<i className={"bi bi-caret" + (statusCaret === "asc" ? "-up-fill" : "-down-fill")}></i>);
    };
};

Caret.propTypes = {
    statusCaret: PropTypes.string.isRequired,
    selectCaret: PropTypes.string.isRequired,
    focusCaret: PropTypes.string.isRequired
};

export default Caret;
