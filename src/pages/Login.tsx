import {Box, Card, CardContent, TextField, Button, Typography, InputAdornment, IconButton, CircularProgress} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { login } from "../store/authSlice";
import AppLogo from "../assets/AppLogo";
import { useSnackbar } from "notistack";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormValues = yup.InferType<typeof schema>;

const DEMO_USERS = [
  { id: "1", name: "Chaitanya", email: "chaitanya@gmail.com", password: "password" },
];

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const user = DEMO_USERS.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      dispatch(login({ id: user.id, name: user.name, email: user.email }));
      enqueueSnackbar(`Welcome back, ${user.name}!`, { variant: "success" });
      navigate("/dashboard");
    } else {
      enqueueSnackbar("Invalid email or password", { variant: "error" });
    }
    setIsLoading(false);
  };

  return (
    <Box sx={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default", p: 2}}>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <AppLogo width={160} height={48} />
            <Typography variant="h5" sx={{fontWeight: 700, mt: 2}}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading} sx={{ py: 1.5, mt: 1 }}>
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;