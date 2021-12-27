import { filter } from 'lodash';
import { useState } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from 'react-helmet';

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
import CreateTeamDialog from './CreateTeam';
import { getRoles } from '@testing-library/react';

const { checkEmptyAndUndefined, getDataFromForm } = ValidationRules()
const { postDataTo, getDataFrom } = DataRequester()

const TABLE_HEAD = [
  { id: 'team', label: 'Team Name', align: "left" },
  { id: 'createdby', label: 'Created By', align: "left" },
  { id: 'createdDate', label: 'Date Created', align: "right" },
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

function cleanTeamData(data) {
  return data.map(value => {
    return {
      id: value.id,
      team: value.name,
      createdBy: value.createdBy.fullName,
      createdDate: value.createdDate.stringDate,
    }
  })
}

function getTeams(setFetched){
  
  getDataFrom("/team").then(response => {

    const TEAMLIST = cleanTeamData(response.data.result)

    
    console.log("TEAMLIST BEFORE CLEAN: ", response.data.result)
    console.log("TEAMLIST IS : ", TEAMLIST)

    setFetched({
      TEAMLIST: TEAMLIST,
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

export default function ManageTeam() {

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
    TEAMLIST: [], 
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
      const newSelecteds = fetchedData.TEAMLIST.map((n) => n.name);
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

  const onCreateTeamButtonClick = () => {
    setOpenDialogue({ isDialogOpen: true, openedBy: CONSTANTS.CREATE_TEAM });
  }

  const onSettingIconClick = (id) => {
    console.log("The id is : ", id)
    setId(id)
    setOpenDialogue({ isDialogOpen: true, openedBy: CONSTANTS.TEAM_SETTING  });
  }

  const createTeam = (teamData) => {

    const team = { 
        name:  teamData.team
    }

    if (checkEmptyAndUndefined(team.name)) {

        setError({ displayError: "show", errorMessage: "Team Name Can Not Be Empty!" })
      return
    }

    setLoading(true)
    setError({ displayError: "none" })

    postDataTo('/team', team).then(function (response) {
      setLoading(false)
      setOpenDialogue(false)
      console.log("Respose from team creation : ", response)
      setSuccess({display: "show", message: "Team Created", data: response.data.result.name})      
      setFetched(previousState => {
        return {
          ...previousState,
          IS_FETCHED: false,
        }
      })
    }).catch(function (err) {
      setLoading(false)
      setError({
        displayError: "show",
        errorMessage: err.response.data.error
      })
    })
  }
  
  const handleSubmit = (event, EventType) => {

    event.preventDefault();

    const userData = getDataFromForm(event.target)
    
    console.log("The Whole User Data : ", userData)

    EventType === CONSTANTS.CREATE_TEAM ? 
    createTeam(userData) : 
    console.log("The Type of event is from default : ", EventType)

    console.log("UserData : ", userData)
    console.log("The Type of event is : ", EventType)
    console.log("The ID is : ", id)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData.TEAMLIST.length) : 0;

  const filteredUsers = applySortFilter(fetchedData.TEAMLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    // <Page title="User | Minimal-UI">
    <Container sx={{ mt: 2 }}>
    <Helmet>
        <title>Manage Teams</title>
      </Helmet>
      <CreateTeamDialog
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
          {success.data.name}
        </Alert>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
          MANAGE TEAMS
        </Typography>
        <Button
          onClick={onCreateTeamButtonClick}
          sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Team
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
              rowCount={fetchedData.TEAMLIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { team, createdBy, createdDate } = row;
                  const isItemSelected = selected.indexOf(team) !== -1;

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
                          onChange={(event) => handleCheckboxClick(event, team)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            alt={team} src={team}
                          />
                          <Typography variant="subtitle2" noWrap>

                            {team}

                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {createdBy}
                      </TableCell>
                      <TableCell align="right">
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
          count={fetchedData.TEAMLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}