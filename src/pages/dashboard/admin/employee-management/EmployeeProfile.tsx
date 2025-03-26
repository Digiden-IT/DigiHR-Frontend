import React from "react";
import { Card, Row, Col, Avatar, Button } from "antd";
import { EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

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
interface EmployeeProfileProps {
  user: User;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ user }) => {
  return (
    <Card
      style={{ maxWidth: 600, margin: "20px auto", borderRadius: 12 }}
      bodyStyle={{ padding: "20px" }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={6}>
          <Avatar
            size={100}
            src="https://i.pravatar.cc/150?img=47"
            alt="Profile Picture"
          />
        </Col>
        <Col span={12}>
          <h2>{user.EmployeeName}</h2>
          <p>
            <UserOutlined /> {user.Role}
          </p>
          <p>
            <MailOutlined /> {user.Email}
          </p>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Profile
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={12}>
          <p>
            <strong>Full Name:</strong> {user.EmployeeName}
          </p>
          <p>
            <strong>Mobile Number:</strong> {user.Department}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user.Email}
          </p>
          <p>
            <strong>Gender:</strong> {user.EmployeeName}
          </p>
          <p>
            <strong>Address:</strong> {user.Email}
          </p>
          <p>
            <strong>Email Address:</strong> {user.Email}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <strong>Employee ID:</strong> {user.EmployeeName}
          </p>
          <p>
            <strong>Employee Type:</strong> {user.Department}
          </p>
          <p>
            <strong>Department:</strong> {user.Department}
          </p>
          <p>
            <strong>Designation:</strong> {user.Email}
          </p>
          <p>
            <strong>Blood Group:</strong> {user.EmployeeName}
          </p>
          <p>
            <strong>Joining Date:</strong> {user.JoiningDate}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default EmployeeProfile;
