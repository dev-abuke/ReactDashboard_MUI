import { filter } from 'lodash';
import { useState } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from 'react-helmet';

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

import Label from '../Label';
import SearchNotFound from '../SearchNotFound';
import CustomDialog from './UserCustomDialogue';
import { UserListHead, UserListToolbar, UserMoreMenu } from '.';
import ValidationRules from '../helper/DataValidators'
import DataRequester from '../helper/DataRequester'
import CONSTANTS from '../helper/Constants';

const { checkEmptyAndUndefined, checkFieldMatch, getDataFromForm } = ValidationRules()
const { postDataTo, getDataFrom } = DataRequester()

const TABLE_HEAD = [
  { id: 'fullname', label: 'Full Name', align: "left" },
  { id: 'username', label: 'User Name', align: "left" },
  { id: 'role', label: 'Role', align: "left" },
  { id: 'team', label: 'Team', align: "left" },
  { id: 'createdby', label: 'Created By', align: "left" },
  { id: 'status', label: 'Status', align: "left" },
  { id: 'setting', label: 'Settings', align: "right" },
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

function cleanUserData(usersList) {

  return usersList.map(user => {

    return {
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      role: user.role.roleName,
      team: user.team.name,
      createdBy: user.createdBy.fullName,
      status: user.isActive,
    }
  })
}

function cleanRoleData(rolesList) {

  return rolesList.map(role => {

    return {
      id: role.id,
      role: role.roleName,
      accessLevel: role.accessLevel,
    }
  })
}

function cleanTeamData(teamList) {
  return teamList.map(team => {
    return {
      id: team.id,
      team: team.name,
    }
  })
}

function getAllData(setFetched){
  
  Promise.all([getDataFrom("/user"), getDataFrom("/role"), getDataFrom("/team")]).then(response => {

    const USERLIST = cleanUserData(response[0].data.result)
    const ROLELIST = cleanRoleData(response[1].data.result)
    const TEAMLIST = cleanTeamData(response[2].data.result)

    setFetched({
      USERLIST: USERLIST,
      ROLELIST: ROLELIST,
      TEAMLIST: TEAMLIST,
      IS_FETCHED: true
    })

  }).catch(error => {
    console.log("Error getting data : ", error.response.data.error)
  })
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(usersList, comparator, query) {

  const stabilizedThis = usersList.map((user, index) => [user, index]);

  console.log("Stabilized : ", stabilizedThis)

  stabilizedThis.sort((a, b) => {
    
  console.log("Stabilized A: ", a[0])
  console.log("Stabilized B: ", b[0])

    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(usersList, (users) => users.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {

  const [error, setError] = useState({
    display: "none",
    message: "",
  });

  const [success, setSuccess] = useState({
    display: "none",
    message: "",
    data: ","
  });

  const [fetchedData, setFetched] = useState({
    USERLIST: [], 
    ROLELIST: [], 
    TEAMLIST: [], 
    IS_FETCHED: false
  });

  const [dialog, setDialogOpen] = useState({ 
    isOpen: false, 
    openedBy: "" 
  });
  
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('fullname');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  fetchedData.IS_FETCHED ? console.log("Already fetched") : getAllData(setFetched)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property); 
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = fetchedData.USERLIST.map((n) => n.name);
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

  const onCreateUserButtonClick = () => {
    setDialogOpen({ isOpen: true, openedBy: "CREATE_USER" });
  }

  const onSettingIconClick = (id) => {
    console.log("The id is : ", id)
    setId(id)
    setDialogOpen({ isOpen: true, openedBy: "USER_SETTING"  });
  }

  const createUser = (userData) => {

    const { fullName, userName, password, confirmPass } = userData

    if (checkEmptyAndUndefined(fullName)) {

      setError({ display: "show", message: "Fullname Can Not Be Empty!" })
      return
    }

    if (checkEmptyAndUndefined(userName)) {

      setError({ display: "show", message: "Username Can Not Be Empty!" })
      return
    }
    if (checkEmptyAndUndefined(password)) {

      setError({ display: "show", message: "You Must Provide Password" })
      return
    }
    if (checkEmptyAndUndefined(confirmPass)) {

      setError({ display: "show", message: "You Must Confirm Password" })
      return
    }
    if (!checkFieldMatch(password, confirmPass)) {

      setError({ display: "show", message: "Passwords Don't Match" })
      return
    }

    setLoading(true)
    setError({ display: "none" })

    postDataTo('/user', userData).then(function (response) {
      setLoading(false)
      setDialogOpen(false)
      console.log("Respose from user creation : ", response)
      setSuccess({display: "show", message: "User Created", data: response.data.result.fullName})
      setFetched(previousState => {
        return {
          ...previousState,
          IS_FETCHED: false,
        }
      })
    }).catch(function (err) {
      setLoading(false)
      setError({
        display: "show",
        message: err.response.data.error
      })
    })
  }


  const resetUser = (userData) => {

    console.log("RESET USER")

    const { password, confirmPass } = userData

    if (checkEmptyAndUndefined(password)) {

      setError({ display: "show", message: "You Must Provide Password" })
      return
    }
    if (checkEmptyAndUndefined(confirmPass)) {

      setError({ display: "show", message: "You Must Confirm Password" })
      return
    }
    if (!checkFieldMatch(password, confirmPass)) {

      setError({ display: "show", message: "Passwords Don't Match" })
      return
    }

    setLoading(true)
    setError({ display: "none" })

    postDataTo('/user/' + id + '/reset', userData).then(response => {
      setLoading(false)
      setDialogOpen(false)
      console.log(response)
    }).catch(err => {
      setLoading(false)
      setError({
        display: "show",
        message: err.response.data.error
      })
    })
  }

  const deactivateUser = () => {

    setLoading(true)

    postDataTo('/user/' + id + '/deactivate').then(response => {
      setLoading(false)
      setDialogOpen(false)
      console.log(response)
    }).catch(err => {
      setLoading(false)
      setError({
        display: "show",
        message: err.response.data.error
      })
    })

  }

  const updateUser = (userData) => {

    const { fullName, role, team } = userData

    if (checkEmptyAndUndefined(fullName)) {

      setError({ display: "show", message: "You Must Provide Fullname!" })
      return
    }

    if (checkEmptyAndUndefined(role)) {

      setError({ display: "show", message: "You Must Provide Role!" })
      return
    }

    if (checkEmptyAndUndefined(team)) {

      setError({ display: "show", message: "You Must Provide Team!" })
      return
    }

    postDataTo('/user/' + id + '/edit', userData).then(response => {
      setLoading(false)
      setDialogOpen(false)
      console.log(response)
    }).catch(err => { 
      setLoading(false)
      setError({
        display: "show",
        message: err.response.data.error
      })
    })

  }

  const handleSubmit = (event, EventType) => {

    event.preventDefault();

    const userData = getDataFromForm(event.target)
    
    console.log("The Whole User Data : ", userData)

    switch (EventType) {

      case CONSTANTS.CREATE_USER:
        createUser(userData)
        break;
      
      case CONSTANTS.RESET_USER_PASSWORD:
        resetUser(userData)
        break;

      case CONSTANTS.DEACTIVATE_USER:
        deactivateUser()
        break;

      case CONSTANTS.UPDATE_USER:
        updateUser(userData)
        break;

      default:
        console.log("The Type of event is from default : ", EventType)

    }

    console.log("UserData : ", userData)
    console.log("The Type of event is : ", EventType)
    console.log("The ID is : ", id)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData.USERLIST.length) : 0;

  const filteredUsers = applySortFilter(fetchedData.USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    // <Page title="User | Minimal-UI">
    <Container sx={{ mt: 2 }}>
    <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <CustomDialog
        data={fetchedData}
        alert={error}
        loading={loading}
        onSubmit={handleSubmit}
        dialogueOpened={dialog} 
        setOpen={setDialogOpen}
      />
      <Stack direction="row" fullWidth alignItems="center" justifyContent="right" mb={3} >
        <Alert variant="filled" onClose={() => {setSuccess({display: "none"})}} sx={{ display: success.display }} severity="success">
          <AlertTitle>{success.message} Successfuly</AlertTitle>
          {success.data}
        </Alert>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
          MANAGE USERS
        </Typography>
        <Button
          onClick={onCreateUserButtonClick}
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
              rowCount={fetchedData.USERLIST.length}
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
                          color={status ? "success" : "error"}
                        >
                          {status ? "Active" : "Banned"}
                        </Label>
                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu onSettingIconClick={onSettingIconClick} id={id} />
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
          count={fetchedData.USERLIST.length}
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