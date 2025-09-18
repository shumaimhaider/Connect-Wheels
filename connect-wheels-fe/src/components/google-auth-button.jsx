import { Button, CircularProgress } from "@mui/material";
import { Google } from "@mui/icons-material";
import { loginWithGoogle } from "../redux/slices/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export default function GoogleAuthButton({
  variant = "outlined",
  buttonText = "Continue with Google",
  loadingText = "Redirecting to Google...",
}) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const dispatch = useDispatch();
  const handleGoogleLogin = () => {
    try {
      setIsGoogleLoading(true);
      dispatch(loginWithGoogle());
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Button
      fullWidth
      variant={variant}
      startIcon={isGoogleLoading ? <CircularProgress size={20} /> : <Google />}
      sx={{
        borderRadius: 2,
        py: 1.5,
        textTransform: "none",
        fontWeight: 500,
      }}
      onClick={handleGoogleLogin}
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? loadingText : buttonText}
    </Button>
  );
}
