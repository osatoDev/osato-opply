import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Grid } from "@mui/material";
import { v4 as uuid } from "uuid";
import { Typography } from "@mui/material";
import { getAuthTokenString } from "../../Helper";
import Layout from "../../Layout";
import { DataGrid } from "@mui/x-data-grid";
import moment from 'moment';

function Quotes() {
  const [quotes, setQuotes] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rows, setRows] = useState<any>([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "created", headerName: "Date Created", width: 200 },
    { field: "title", headerName: "Title", width: 450 },
  ];

  useEffect(() => {
    document.title = "Opply Coding Test - Quotes";
    const token = getAuthTokenString();
    const url = `${process.env.REACT_APP_TARGET_BACKEND}/api/v1/quotes/`;
    const requestOptions = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setQuotes(res.results);

        const rows = res.results.map(
          (row: { id: any; amount: any; created: any; title: any }) => ({
            id: row.id,
            amount: row.amount,
            created: moment(row.created).format("MMM Do YYYY"),
            title: row.title,
          })
        );

        setRows(rows);
      })
      .catch((err) => console.error(err));
    return () => {
      document.title = "Opply Coding Test";
    };
  }, []);

  return (
    <Layout>
      <Grid
        container
        direction="row"
        style={{ height: 650, width: "100%" }}
        alignContent="center"
        justifyContent="center"
      >
        <Grid item style={{ height: 550, width: "50%" }}>
          {quotes && quotes.length == 0 ? (
            <Typography> No quotes yet. Come back later. </Typography>
          ) : (
            <Typography>Quotes</Typography> && (
              <DataGrid
                columns={columns}
                rows={rows}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize: React.SetStateAction<number>) =>
                  setPageSize(newPageSize)
                }
                rowsPerPageOptions={[5,10, 20]}
                pagination
              />
            )
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Quotes;
