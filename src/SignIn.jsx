import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "./global";

export function SignIn() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("success");

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        console.log("error");
        setFormState("error");
      } else {
        setFormState("success");
        const result = await data.json();
        console.log(result);
        localStorage.setItem("token", result.token);
        navigate("/money-manager");
      }
    },
  });

  return (
    <Container
      onSubmit={handleSubmit}
      className="signin"
      component="main"
      maxWidth="xs"
    >
      <div>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome Admin...!!!
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username" // Change id to "username"
                label="Email Address"
                name="username" // Change name to "username"
                value={values.username}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color={formState}
              >
                {formState === "success" ? "Submit" : "Retry"}
              </Button>
              <div>
                <Grid container>
                  <Grid item xs>
                    <Link href="./forgot" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <a href="./signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </a>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </div>
        </Box>
      </div>
    </Container>
  );
}
