import { filter } from 'lodash';
import Axios from 'axios';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
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
  TablePagination
} from '@mui/material';
// components
import Page from '../Page';
import Label from '../Label';
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';
import Dialog from '../user/UserCreationDialogue';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
import ValidationRules from '../helper/DataValidators'
import DataRequester from '../helper/DataRequester'
//import USERLIST from '../mock/user';

const { checkEmptyAndUndefined, checkFieldMatch, getDataFromForm } = ValidationRules()
const { sendCreateUserReq, sendGetUsersReq } = DataRequester()

let USERLIST = [];
const TABLE_HEAD = [
  { id: 'fullname', label: 'Full Name', alignRight: false },
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
  { id: 'createdby', label: 'Created By', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'setting', label: 'Settings', alignRight: true },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getUsers() {
  return sendGetUsersReq("/user").then(response => {
    console.log(response.data.result)
    USERLIST = cleanResponse(response.data.result)
    console.log("USERLIST IS : ", USERLIST)
  }).catch(function (error) {
    console.log("Error getting users : ", error.response.data.error)
  })
}

function cleanResponse(data) {
  return data.map( (value) => {
    return {
      id: value.id,
      fullName: value.fullName,
      userName: value.userName,
      role: value.role.roleName,
      team: value.team.name,
      createdBy: value.createdBy.fullName,
      status: value.isActive,
    }
  })
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User({ token }) {

  
  const [alert, setAlert] = useState({
    display: "none",
    errorMessage: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetching] = useState(true);
  const [page, setPage] = useState(0);
  const [dialogueOpened, setOpenDialogue] = useState(false);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  getUsers()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
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

  const changeStatusColor = (status) => {
    if (status)
      return "success"
    else
      return "error"
  };

  const showCreateUserDialogue = () => {
    setOpenDialogue(true);
  }

  const handleCreateUserButtonClick = (event) => {
    event.preventDefault();

    const userData = getDataFromForm(event.target)

    const { fullName, userName, password, confirmPass } = userData

    console.log("UserData : ", userData)

    if (checkEmptyAndUndefined(fullName)) {

      setAlert({ display: "show", errorMessage: "Fullname Can Not Be Empty!" })
      return
    }

    if (checkEmptyAndUndefined(userName)) {

      setAlert({ display: "show", errorMessage: "Username Can Not Be Empty!" })
      return
    }
    if (checkEmptyAndUndefined(password)) {

      setAlert({ display: "show", errorMessage: "You Must Provide Password" })
      return
    }
    if (checkEmptyAndUndefined(confirmPass)) {

      setAlert({ display: "show", errorMessage: "You Must Confirm Password" })
      return
    }
    if (!checkFieldMatch(password, confirmPass)) {

      setAlert({ display: "show", errorMessage: "Passwords Don't Match" })
      return
    }

    setLoading(true)
    setAlert({ display: "none" })

    sendCreateUserReq('/user', userData).then(function (response) {
      setLoading(false)
      setOpenDialogue(false)
      console.log(response)
    }).catch(function (error) {
      setLoading(false)
      setAlert({
        display: "show",
        errorMessage: error.response.data.error
      })
    })
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    // <Page title="User | Minimal-UI">
    <Container sx={{ mt: 6 }}>
      <Dialog
        alert={alert}
        loading={loading}
        onSubmit={handleCreateUserButtonClick}
        dialogueOpened={dialogueOpened}
        setOpen={setOpenDialogue}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
          MANAGE USERS
        </Typography>
        <Button
          onClick={showCreateUserDialogue}
          sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create User
        </Button>
      </Stack>

      <Card sx={{ mb: 5, boxShadow: 4, borderRadius: 5 }}>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {/* <Scrollbar> */}
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={USERLIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, fullName, userName, role, team, createdBy, status, avatarUrl } = row;
                  const isItemSelected = selected.indexOf(fullName) !== -1;

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
                          onChange={(event) => handleClick(event, fullName)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            alt={fullName} src={avatarUrl}
                          />
                          <Typography variant="subtitle2" noWrap>

                            {fullName}

                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {userName}
                      </TableCell>
                      <TableCell align="left">
                        {role}
                      </TableCell>
                      <TableCell align="left">
                        {team}
                      </TableCell>
                      <TableCell align="left">
                        {createdBy}
                      </TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={changeStatusColor(status)}
                        >
                          {status ? "Active" : "Banned"}
                        </Label>
                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>
                  );

                })
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
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
          count={USERLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
    // </Page>
  );
}