import {Button} from "@mui/material";
import {useNavigate} from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
      <div style={{ justifyContent: 'center' }}>
        <h1>Home Page</h1>
        <Button variant="outlined" color="primary" onClick={() => navigate(`/posts`)}>
          All Posts
        </Button>
      </div>
  );
};

