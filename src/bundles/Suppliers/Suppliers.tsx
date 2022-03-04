import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { getAuthTokenString } from "../../Helper";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import { DataGrid} from "@mui/x-data-grid";

function Suppliers() {
  const [suppliers, setSuppliers] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rows, setRows] = useState<any>([]);
  let navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "description", headerName: "Description", width: 250 },    
  ];
  useEffect(() => {
    document.title = "Opply Coding Test - Suppliers";

    const token = getAuthTokenString();
    const url = `${process.env.REACT_APP_TARGET_BACKEND}/api/v1/suppliers/`;
    const requestOptions = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setSuppliers(res.results);
        const rows = res.results.map(
          (row: { id: any; name: any; description: any }) => ({
            id: row.id,
            name: row.name,
            description: row.description,
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
        style={{ height: 650, width: "100%" }}
        alignContent="center"
        justifyContent="center"
      >
        <Grid item style={{ height: 550, width: "50%" }}>
          {suppliers && suppliers.length === 0 ? (
            <Typography> No suppliers yet. Come back later. </Typography>
          ) : (
            <>
              <Typography variant="h5">Suppliers</Typography>
              <DataGrid
                onCellClick={(params, e) => navigate(`/supplier/${params.id}`)}
                columns={columns}
                rows={rows}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize: React.SetStateAction<number>) =>
                  setPageSize(newPageSize)
                }
                rowsPerPageOptions={[5, 10, 20]}
                pagination
              />
            </>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Suppliers;
