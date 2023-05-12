import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardProduct({ marca, img, modelo, precio, id }) {
  return (
    <div>
      <Card sx={{ minWidth: 345 }}>
        <Link to={`/detail/${id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={img}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {marca}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${marca} / ${modelo}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`$${precio}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}
