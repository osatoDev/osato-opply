import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthTokenString } from "../../Helper";
import { Card, CardContent, CardActions, CardMedia, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Layout from "../../Layout";

const SpecificSupplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<any>({});
  const [supplierRandomPhoto, setSupplierRandomPhoto] = useState<string>("");
  useEffect(() => {
    document.title = "Opply Coding Test - Supplier";
    const token = getAuthTokenString();
    const url = `${process.env.REACT_APP_TARGET_BACKEND}/api/v1/suppliers/${id}/`;
    const requestOptions = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setSupplier(response);
        fetchRandomPhoto(response.description);
      })
      .catch((err) => console.error(err));
    return () => {
      document.title = "Opply Coding Test";
    };
  }, []);

  const fetchRandomPhoto = (description: string) => {
    const requestOptions = {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const url = `https://api.unsplash.com/photos/random?query=${description}`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setSupplierRandomPhoto(res.urls.regular);
      });
  };

  return (
    <Layout>
      <Grid
        container
        direction="row"
        alignContent="center"
        justifyContent="center"
      >
        {supplier && supplier.length == 0 ? (
          <Typography>Supplier not found </Typography>
        ) : (
          <Card sx={{ minWidth: 275 }}>
            <CardMedia>
              <img src={supplierRandomPhoto} alt="" height={400} />
            </CardMedia>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {supplier.name}
              </Typography>
              <Typography variant="body2">
                {supplier.description}
                <br />
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Layout>
  );
};

export default SpecificSupplier;
