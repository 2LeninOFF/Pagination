import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, color }) => {
    return <span className={`badge bg-${color} mx-1`}>{name}</span>;
};
Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
export default Qualitie;
