import { filter } from "lodash";
import { useState } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import AddIcon from '@mui/icons-material/Add';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

//Components
import SearchNotFound from "../Components/NotFound/SearchNotFound";
import TableHead from './TableHead';
import TableToolbar from "./TableToolbar";
import Label from '../Components/Label';
import MoreMenu from './MoreMenu';

//{import CONSTANTS from "../Helpers/Constants";}

import ManagementDialog from "./ManagementDialog";
import { Helmet } from "react-helmet";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(fetchedData, TABLE_HEAD, comparator, query) {
  console.log("Sort FilterArray : ", fetchedData);
  const stabilizedThis = fetchedData.map((value, index) => [value, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      fetchedData,
      (data) => data[TABLE_HEAD[0].id].toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Management(props) {

    const {
        handleCreateButtonClick,
        handleSuccessAlertClose,
        success,
        pageName,
        fetchedData,
        TABLE_HEAD,
    } = props

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState(TABLE_HEAD[0].id);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = fetchedData.map((n) => n.roleName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - fetchedData.length)
      : 0;

  const filteredDatas = applySortFilter(
    fetchedData,
    TABLE_HEAD,
    getComparator(order, orderBy),
    filterName
  );

  const isDataNotFound = filteredDatas.length === 0;

  return (
    // <Page title="User | Minimal-UI">
    <Container sx={{ mt: 2 }}>
      <Helmet>
        <title>Manage {pageName}</title>
      </Helmet>
      <ManagementDialog {...props}/>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="right"
        mb={3}
      >
        <Alert
          variant="filled"
          onClose={() => {handleSuccessAlertClose()}}
          sx={{ display: success.display }}
          severity="success"
        >
          <AlertTitle>{success.message}</AlertTitle>
          {success.data}
        </Alert>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
          {`MANAGE ${pageName.toUpperCase()}`}
        </Typography>
        <Button
          onClick={handleCreateButtonClick}
          sx={{
            "&:hover": { backgroundColor: "#E53e31" },
            backgroundColor: "#f53e31",
          }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          {`Create ${pageName}`}
        </Button>
      </Stack>

      <Card sx={{ mb: 5, boxShadow: 4, borderRadius: 5 }}>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {/* <Scrollbar> */}
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={fetchedData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredDatas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id } = row;
                  const isItemSelected = selected.indexOf(row[TABLE_HEAD[0].id]) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleCheckboxClick(event, row[TABLE_HEAD[0].id])}
                        />
                      </TableCell>
                      
                      {TABLE_HEAD.map( (head, index) => {

                        if(index === 0){

                          return ( 

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={row[head.id]} src={row[head.id]} />
                                <Typography variant="subtitle2" noWrap>
                                  {row[head.id]}
                                </Typography>
                              </Stack>
                          </TableCell>

                        )}else if(head.id === "setting"){
                          
                            return ( 

                              <TableCell align="right">
                                <MoreMenu {...props} row={row}/> 
                              </TableCell>
                            )
                        }else if(head.id === "status"){

                            return ( 
                              <TableCell align="left">
                                <Label
                                  variant="ghost"
                                  color={row[head.id] ? "success" : "error"}
                                >
                                  {row[head.id] ? "Active" : "Banned"}
                                </Label>
                              </TableCell>
                            )
                        }

                        return (
                          <TableCell align={head.align}>{row[head.id]}</TableCell>
                        )

                      })}

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isDataNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={fetchedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
