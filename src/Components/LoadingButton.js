import LoadingButton from "@mui/lab/LoadingButton";

export default function _LoadingButton({ loading, buttonName }) {
    
  return (
    <LoadingButton
      type="submit"
      loading={loading}
      fullWidth
      sx={{
        "&:hover": { backgroundColor: "#E53e31" },
        backgroundColor: "#f53e31",
      }}
      size="large"
      variant="contained"
    >
      {buttonName}
    </LoadingButton>
  );
}
