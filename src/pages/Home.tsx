import {Button} from "@mui/material";
import {useNavigate} from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
      <div style={{ justifyContent: 'center' }}>
        <h1>main page</h1>
        <Button variant="outlined" color="primary" onClick={() => navigate(`/posts`)}>
          

          all posts


        </Button>
      </div>
  );
};

