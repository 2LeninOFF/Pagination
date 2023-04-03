import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import UserPage from "./userPage";

const Users = ({ match, history }) => {
    const userId = match.params.userId;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (userId) {
        return <UserPage userId={userId} history={history} />;
    } else {
        if (users) {
            const filteredUsers = selectedProf
                ? users.filter(
                    (user) => user.profession._id === selectedProf._id
                )
                : users;

            const count = filteredUsers.length;

            const usersSort = _.orderBy(
                filteredUsers,
                [sortBy.path],
                [sortBy.order]
            );

            const userCrop = paginate(usersSort, currentPage, pageSize);

            const clearFilter = () => {
                setSelectedProf();
            };
            return (
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                Очистить
                            </button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStatus length={count} />
                        {count > 0 && (
                            <UserTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onToggleBookMark={handleToggleBookMark}
                                onDelete={handleDelete}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return "loading...";
    }
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Users;
