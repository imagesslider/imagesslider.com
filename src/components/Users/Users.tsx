import React, { FC, useEffect, useState } from "react";
import "../Users/Users.css";
import { firestore } from "../../Firebase/Firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isImageAction } from "../../Actions/actionsApp";
import Spinner from "../UI/Spinner/Spinner";

const Users: FC = () => {
  //state
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //actions redux
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    dispatch(isImageAction(false));
    const unmount = firestore.collection("users").onSnapshot((snapshot) => {
      let user = snapshot.docs.map((doc) => {
        const data = doc.data();
        const user_id = doc.id;
        return { user_id, ...data };
      });
      setUsers(user);
      setIsLoading(false);
    });
    return unmount;
  }, [dispatch]);

  //isLoading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="users">
        <h2 className="users_title">Users</h2>
        <div className="users_conteiner">
          {users.map((user: any) => {
            return (
              <Link
                key={user?.user_id}
                to={`/users/${user?.user_id}`}
                style={{ textDecoration: "none" }}
              >
                <div key={user?.user_id} className="users_user_content">
                  {user?.user_image?.length === 0 ? (
                    <i className="fas fa-user-circle fa-5x"></i>
                  ) : (
                    <img
                      crossOrigin="anonymous"
                      src={user?.user_image}
                      alt={user?.user_image}
                      className="users_user_img"
                    />
                  )}
                  <div className="users_user_name_wrapper">
                    <h4 className="users_user_name">{user?.first_name}</h4>
                    <h4 className="users_user_name">{user?.last_name}</h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Users;
