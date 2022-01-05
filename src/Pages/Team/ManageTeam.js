import { useState } from "react";
import { useNavigate } from "react-router-dom";

// material

// components
import ValidationRules from "../../Helpers/DataValidators";
import DataRequester from "../../Helpers/DataRequester";
import CONSTANTS from "../../Helpers/Constants";
import Management from "../Management";
import CreateTeam from "./CreateTeam";

const {
  checkEmptyAndUndefined,  
  getDataFromForm,
  cleanTeamData 

} = ValidationRules()

const { 
  postDataTo, 
  getDataFrom 
  
} = DataRequester();

function getTeams(setFetched, navigate) {

  getDataFrom("/team")
    .then((response) => {

      const TEAMLIST = cleanTeamData(response.data.result);

      setFetched({
        TEAMLIST: TEAMLIST,
        IS_FETCHED: true,
      });
    })
    .catch((error) => {
      console.log("Error getting data : ", error.response.data.error);
      if (error.response.data.error === "Not Authorized") navigate("/");
    });
}

export default function ManageTeams() {

  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState({
    display: "none",
    message: "",
    data: "",
  });

  const [team, setTeam] = useState({
    TEAMLIST: [],
    IS_FETCHED: false,
  });

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    EventType: "",
    errorDisplay: "none",
    errorMessage: "",
  });

  const updateSuccessAlertState = (newstate) => {

    setSuccess((previousState) => {

      return {
        ...previousState,
        ...newstate,
      };
    });
  };

  const updateDialogState = (newstate) => {

    setDialog((previousState) => {

      return {
        ...previousState,
        ...newstate,
      };
    });
  };

  const onCreateTeamButtonClick = () => {

    updateDialogState({
      isOpen: true,
      title: CONSTANTS.CREATE_TEAM_TITLE,
    });
  };

  const onSettingIconClick = (row) => {

    updateDialogState({
      isOpen: true,
      title: CONSTANTS.TEAM_SETTING_TITLE,
    });
  };

  team.IS_FETCHED
    ? console.log("Already fetched")
    : getTeams(setTeam, navigate);

  const createTeam = (teamData) => {
    
    const newTeam = {
      name: teamData.team,
    };

    if (checkEmptyAndUndefined(newTeam.name)) {

      updateDialogState({
        errorDisplay: "show",
        errorMessage: "Team Name Can't Be Empty!",
      });
      return;
    }

    setLoading(true);
    updateDialogState({ errorDisplay: "none" });

    postDataTo("/team", newTeam)
      .then(function (response) {
        setLoading(false);
        updateDialogState({ isOpen: false });
        updateSuccessAlertState({
          display: "show",
          message: "Team Created Successfuly",
          data: response.data.result.name,
        });
        console.log("Respose from team creation : ", response);
        setTeam((previousState) => {
          return {
            ...previousState,
            IS_FETCHED: false,
          };
        });
      })
      .catch(function (err) {
        setLoading(false);
        updateDialogState({
          errorDisplay: "show",
          errorMessage: err.response.data.error,
        });
      });
  };

  const onCloseDialog = () => {
    updateDialogState({ isOpen: false, errorDisplay: "none" });
  };

  const onCloseSuccessResult = () => {
    updateSuccessAlertState({ display: "none" });
  };

  const onSubmit = (event, EventType) => {
    event.preventDefault();

    const teamData = getDataFromForm(event.target);

    EventType === CONSTANTS.CREATE_TEAM
      ? createTeam(teamData)
      : console.log("The Type of event is from default : ", EventType);
  };

  return (
    <Management
      handleCreateButtonClick={onCreateTeamButtonClick}
      handleSettingIconClick={onSettingIconClick}
      handleDialogClose={onCloseDialog}
      handleSuccessAlertClose={onCloseSuccessResult}
      handleSubmit={onSubmit}
      Content={CreateTeam}
      TABLE_HEAD={CONSTANTS.TEAMS_TABLE_HEAD}
      pageName={CONSTANTS.TEAM_PAGE_NAME}
      fetchedData={team.TEAMLIST}
      dialog={dialog}
      loading={loading}
      success={success}
    />
  );
}
