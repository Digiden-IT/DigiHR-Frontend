import React from "react";

// Define TypeScript interface for user data
interface User {
    key: React.Key;
    EmployeeName: string;
    Email: string;
    Department: string;
    Role: string;
    JoiningDate: string;
}

// Define props interface
interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div>
      <h3>Name: {user.EmployeeName}</h3>
      <p>Email: {user.Email}</p>
      <p>Phone: {user.Role}</p>
      <p>Department: {user.Department}</p>
      <p>Employee Role: {user.Role}</p>
      <p>Joining Date: {user.JoiningDate}</p>
    </div>
  );
};

export default UserDetails;
