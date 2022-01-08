import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CONSTANTS from "../../Helpers/Constants";

import ValidationRules from "../../Helpers/DataValidators";
import DataRequester from "../../Helpers/DataRequester";

// components
import Management from "../Management";
import CreateTeam from "./CreateTeam";
import MenuOptions from "../MenuOptions";

const { 
  getDataFromForm,
  cleanTeamData,
  validateData,

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

  const [menu] = useState({
    options: CONSTANTS.TEAM_MENU_OPTIONS,
    ui: MenuOptions,
  });

  const [team, setTeam] = useState({
    TEAMLIST: [],
    IS_FETCHED: false,
  });

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    Content: CreateTeam,
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
      Content: CreateTeam,
      isOpen: true,
      title: CONSTANTS.CREATE_TEAM_TITLE,
    });
  };

  const onTeamMenuClick = (setOpen, row, eventType) => {

    setOpen(false)

    switch(eventType){
      case CONSTANTS.DELETE_TEAM_MENU_CLICK:
        console.log("DELETE_TEAM_MENU_CLICK :", row)
        break;
      case CONSTANTS.EDIT_TEAM_MENU_CLICK: 
        console.log("EDIT_TEAM_MENU_CLICK :", row)
        break;
      default:
        console.log("DEFAULT MANAGE TEAMS EVENT NAME :", eventType)
        
    }
  };

  team.IS_FETCHED
    ? console.log("Already fetched")
    : getTeams(setTeam, navigate);

  const createTeam = (teamData) => {
    
    const newTeam = {
      name: teamData.team,
    };

    try{
      validateData({teamName: newTeam.name})
    }catch(err){
      updateDialogState({
        errorDisplay: "show",
        errorMessage: err.message,
      });
      return
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
        setTimeout(() => {
          updateSuccessAlertState({
            display: "none",
          });
        }, 15000)
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
      handleMenuClick={onTeamMenuClick}
      handleDialogClose={onCloseDialog}
      handleSuccessAlertClose={onCloseSuccessResult}
      handleSubmit={onSubmit}
      TABLE_HEAD={CONSTANTS.TEAMS_TABLE_HEAD}
      pageName={CONSTANTS.TEAM_PAGE_NAME}
      fetchedData={team.TEAMLIST}
      dialog={dialog}
      menu={menu}
      loading={loading}
      success={success}
    />
  );
}
