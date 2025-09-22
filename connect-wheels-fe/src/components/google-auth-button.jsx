import { Button, CircularProgress } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useLoginWithGoogleQuery } from "../redux/slices/apiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

export default function GoogleAuthButton({
  variant = "outlined",
  buttonText = "Continue with Google",
  loadingText = "Redirecting to Google...",
}) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { refetch: triggerGoogleLogin } = useLoginWithGoogleQuery();

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await triggerGoogleLogin();
      
      if (result.data?.authUrl) {
        window.location.href = result.data.authUrl;
      } else {
        throw new Error("No auth URL received");
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      setIsGoogleLoading(false);
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
