import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import type { GridColDef, GridSortModel } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import MoreMenuButton from "./MoreMenuButton.tsx";
import TextField from "@mui/material/TextField";
import type { IPosts, IUsers } from "./interface/interface.tsx";
import { Skeleton } from "@mui/material";
function TableComponent() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = useState(10);
  const [ini, setIni] = useState(false);
  const navigate = useNavigate();
  const { page: pageParam } = useParams<{ page: string }>();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const filteredRows = posts.filter(
    (row) =>
      row.title.toLowerCase().includes(searchText.toLowerCase()) ||
      row.body.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    setLoading(true);
    const fetchPosts = fetch("https://jsonplaceholder.typicode.com/posts").then(
      (res) => res.json(),
    );
    const fetchUsers = fetch("https://jsonplaceholder.typicode.com/users").then(
      (res) => res.json(),
    );

    Promise.all([fetchPosts, fetchUsers]).then(([postsData, usersData]) => {
      const userMap = new Map();
      usersData.forEach((user: IUsers) => userMap.set(user.id, user.name));

      const postsWithUserNames = postsData.map((post: IPosts) => ({
        ...post,
        userName: userMap.get(post.userId) || "Unknown",
      }));
      setPosts(postsWithUserNames);
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: "commodity",
      sort: "asc",
    },
  ]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Post ID", width: 90 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "body", headerName: "Description", flex: 2 },
    { field: "userName", headerName: "Author", width: 150 },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <MoreMenuButton postID={params.row.id} />,
    },
  ];

  useEffect(() => {
    if (!pageParam) return;
    setIni(true);
    setPage(+pageParam);
  }, [pageParam]);

  return (
    <>
      <Box sx={{ width: "100%", mx: "auto", mt: 5 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ mb: 2 }}
        />
        {!loading ? (
          <DataGrid
            rows={filteredRows}
            loading={loading}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  page: pageParam ? +pageParam : 0,
                },
              },
            }}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              if (ini && model.page === 0) return;
              setPage(model.page);
              setPageSize(model.pageSize);
              navigate(`/page/${model.page}`);
            }}
            pageSizeOptions={[5, 10, 20]}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            disableRowSelectionOnClick
          />
        ) : (
          Array.from(new Array(5)).map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              sx={{ mb: 2 }}
              height={50}
              animation="wave"
            />
          ))
        )}
      </Box>
    </>
  );
}
export default TableComponent;
