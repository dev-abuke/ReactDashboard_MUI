import { filter } from 'lodash';
import { useState } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
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
  TablePagination
} from '@mui/material';

// components
import SearchNotFound from '../SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../User/index';
import ValidationRules from '../helper/DataValidators'
import DataRequester from '../helper/DataRequester'
import CONSTANTS from '../helper/Constants';
import CreateRoleDialog from './CreateRole';
import { getRoles } from '@testing-library/react';
import { Helmet } from 'react-helmet';

const { checkEmptyAndUndefined, getDataFromForm } = ValidationRules()
const { postDataTo, getDataFrom } = DataRequester()

const TABLE_HEAD = [
  { id: 'role', label: 'Role Name', alignRight: "left" },
  { id: 'accessLevel', label: 'Access Level', align: "left" },
  { id: 'createdBy', label: 'Created By', align: "left" },
  { id: 'createdDate', label: 'Date Created', align: "center" },
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

function cleanRoleData(roleList) {
  return roleList.map(role => {
    return {
      id: role.id,
      role: role.roleName,
      accessLevel: role.accessLevel,
      createdBy: role.createdBy.fullName,
      createdDate: role.createdDate.stringDate,
    }
  })
}

function getTeams(setFetched){
  
  getDataFrom("/role").then(response => {

    const ROLELIST = cleanRoleData(response.data.result)

    
    console.log("ROLELIST BEFORE CLEAN: ", response.data.result)
    console.log("ROLELIST IS : ", ROLELIST)

    setFetched({
      ROLELIST: ROLELIST,
      IS_FETCHED: true
    })

  }).catch(error => {
    console.log("Error getting data : ", error)
  })
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log("Sort FilterArray : ", array)
  const stabilizedThis = array.map((value, index) => [value, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (teams) => teams.team.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ManageRole() {

  const [error, setError] = useState({
    display: "none",
    message: "",
  });

  const [success, setSuccess] = useState({
    display: "none",
    message: "",
    data: "",
  });

  const [fetchedData, setFetched] = useState({
    ROLELIST: [], 
    IS_FETCHED: false
  });

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [page, setPage] = useState(0);
  const [dialog, setOpenDialogue] = useState({ isDialogOpen: false, openedBy: "" });
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('team');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  fetchedData.IS_FETCHED ? console.log("Already fetched") : getTeams(setFetched)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property); 
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = fetchedData.ROLELIST.map((n) => n.name);
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

  const onCreateRoleButtonClick = () => {
    setOpenDialogue({ isDialogOpen: true, openedBy: CONSTANTS.CREATE_TEAM });
  }

  const onSettingIconClick = (id) => {
    console.log("The id is : ", id)
    setId(id)
    setOpenDialogue({ isDialogOpen: true, openedBy: CONSTANTS.TEAM_SETTING  });
  }

  const createRole = (roleData) => {

    const role = { 
        roleName:  roleData.role,  
        accessLevel: roleData.accessLevel,
    }

    if (checkEmptyAndUndefined(roleData.role)) {

        setError({ display: "show", message: "Role Name Can Not Be Empty!" })
        return
    }

    if (checkEmptyAndUndefined(roleData.accessLevel)) {

        setError({ display: "show", message: "Access Level Can Not Be Empty!" })
        return
    }

    setLoading(true)
    setError({ displayError: "none" })

    postDataTo('/role', role).then((response) => {
      setLoading(false)
      setOpenDialogue(false)
      console.log("Respose from role creation : ", response)
      setSuccess({display: "show", message:"Role Created", data: response.data.result.roleName})
      setFetched(previousState => {
        return {
          ...previousState,
          IS_FETCHED: false,
        }
      })
    }).catch(function (err){
      setLoading(false)
      console.log(err.response)
      setError({
        display: "show",
        message: err.response,
      })
    })
  }
  
  const handleSubmit = (event, EventType) => {

    event.preventDefault();

    const roleData = getDataFromForm(event.target)
    
    console.log("The Whole role Data : ", roleData)

    EventType === CONSTANTS.CREATE_ROLE ? 
    createRole(roleData) : 
    console.log("The Type of event is from default : ", EventType)

    console.log("ROLEDATA : ", roleData)
    console.log("The Type of event is : ", EventType)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData.ROLELIST.length) : 0;

  const filteredUsers = applySortFilter(fetchedData.ROLELIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    // <Page title="User | Minimal-UI">
    <Container sx={{ mt: 2 }}>
    <Helmet>
        <title>Manage Roles</title>
      </Helmet>
      <CreateRoleDialog
        data= {fetchedData}
        alert={error}
        loading={loading}
        onSubmit={handleSubmit}
        dialogueOpened={dialog} 
        setOpen={setOpenDialogue}
      />
      <Stack direction="row" fullWidth alignItems="center" justifyContent="right" mb={3} >
        <Alert variant="filled" onClose={() => {setSuccess({display: "none"})}} sx={{ display: success.display }} severity="success">
          <AlertTitle>{success.message} Successfuly</AlertTitle>
          {success.data}
        </Alert>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
          MANAGE ROLES
        </Typography>
        <Button
          onClick={onCreateRoleButtonClick}
          sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Role
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
              rowCount={fetchedData.ROLELIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, role, accessLevel, createdBy, createdDate } = row;
                  const isItemSelected = selected.indexOf(role) !== -1;

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
                          onChange={(event) => handleCheckboxClick(event, role)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            alt={role} src={role}
                          />
                          <Typography variant="subtitle2" noWrap>

                            {role}

                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {accessLevel}
                      </TableCell>
                      <TableCell align="left">
                        {createdBy}
                      </TableCell>
                      <TableCell align="center">
                        {createdDate}
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
          count={fetchedData.ROLELIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}