import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "../../features/auth/authApi";
import { storage } from "../../services/storage";
import { login } from "../../features/auth/authSlice";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  type LoginFormData,
} from "../../features/auth/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input/Input";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginApi] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const oneSubmit = async (values: LoginFormData) => {
    try {
      const response = await loginApi(values).unwrap();
      storage.setAccessToken(response.data.access_token);
      storage.setRefreshToken(response.data.refresh_token);

      dispatch(
        login({
          id: response.data.user.id,
          email: response.data.user.email,
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(oneSubmit)}>
        <Input
          label="Email"
          registration={register("email")}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password}
        />
        <button className="btn btn-primary w-100" disabled={isSubmitting}>
          {isSubmitting ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
