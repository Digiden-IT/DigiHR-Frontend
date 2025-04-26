import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import logo from "../../../public/Logo.png";
import { TUser } from "../../types/user.type";
import { toast } from "sonner";

const LoginForm = () => {
  const [login, { error, isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (error) {
    console.log(error);
  }

  const onFinish = async (values: { email: string; password: string }) => {
    const toastId = toast.loading("Logging in");
    try {
      const response = await login(values).unwrap();
      const decodedUser = jwtDecode(response.accessToken) as TUser;
      dispatch(
        setUser({
          user: decodedUser,
          token: response.accessToken,
        })
      );
      if (response.accessToken && decodedUser) {
        toast.success("Logged in successfully", {
          id: toastId,
          duration: 2000,
        });
        navigate(`/${decodedUser?.role.toLowerCase()}/dashboard`, {
          replace: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // message.error(err?.data?.message as string);
      toast.error(
        err?.data?.message || "Something went wrong, try again later",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
      className="md:w-1/2"
    >
      <div className="flex justify-center mb-8">
        <img src={logo} className="w-8/12" />
      </div>
      <Form.Item
        hasFeedback
        name="email"
        rules={[
          { type: "email" },
          { required: true, message: "Please input your Email!" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <p className="mb-4">Forgot Password?</p>

      <Form.Item className="text-primary">
        <Button
          block
          disabled={isLoading}
          type="primary"
          htmlType="submit"
          size="large"
          className="btn1 uppercase"
        >
          {isLoading ? "Loging..." : "Log in"}
        </Button>
      </Form.Item>
      <p className="text-center">
        or return to
        <Link to={"/"} className="font-semibold uppercase mx-1">
          Home
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
