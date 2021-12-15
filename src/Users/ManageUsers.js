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
import UserCreationDialog from '../user/UserCreationDialogue';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';

import USERLIST from '../mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullname', label: 'Full Name', alignRight: false },
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
  { id: 'createdby', label: 'Created By', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'setting', label: 'Settings', alignRight: true },
];

// ----------------------------------------------------------------------

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

export default function User({token}) {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [dialogueOpened, setOpenDialogue] = useState(false);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    if(status === "Banned")
      return "error"
    else if(status === "Active")
      return 'success'
    else if(status === "Pending")
      return 'info'
  };

  const showCreateUserDialogue = () => {
    setOpenDialogue(true);
  }

  const handleCreateUserButtonClick = (event) => {
    event.preventDefault();
    setLoading(true)

    const data = new FormData(event.target);

    const username = data.get("username");
    const fullname = data.get("fullname");
    const password = data.get("password");
    const confirmPass = data.get("confirm");
    const role = data.get("role");
    const team = data.get("team");

    const passMatch = (password === confirmPass)

    if(!passMatch){
      setLoading(false)
      console.log("No Match")
      return;
    }
    const userData = {
      fullName: fullname,
      userName: username,
      password: password,
      role: role,
      team: team,
    }

    const config = {
      headers: {
      'Content-Type': 'application/json',
      'authorization': token
      }
    }

    Axios.post(
    "http://localhost:3001/api/user", 
    userData, 
    config
    ).then(function (response) {
      setLoading(false)
      setOpenDialogue(false)
      console.log(response);
    }).catch(function (error) {
      setLoading(false)
      console.log(error);
    }).then(function (response) {
      // always executed
      console.log("respo ", response);
    });
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return ( 
    // <Page title="User | Minimal-UI">
      <Container sx={{mt: 6 }}>
      <UserCreationDialog loading={loading} onSubmit={handleCreateUserButtonClick} dialogueOpened={dialogueOpened} setOpen={setOpenDialogue} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography sx={{fontWeight: "bold"}} variant="h5" gutterBottom>
            MANAGE USERS
          </Typography>
          <Button
            onClick={showCreateUserDialogue}
            sx={{ '&:hover':  {backgroundColor: "#E53e31"}, backgroundColor: "#f53e31" }}
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
                      const { id, name, username, role, team, createdBy, status, avatarUrl } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

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
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar  
                              alt={name} src={avatarUrl}
                              />
                              <Typography variant="subtitle2" noWrap>

                                {name}

                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                          {username}
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
                              {status}
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