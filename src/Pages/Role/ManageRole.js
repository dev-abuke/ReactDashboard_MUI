import { useState } from "react";

//Helpers
import ValidationRules from "../../Helpers/DataValidators";
import DataRequester from "../../Helpers/DataRequester";
import CONSTANTS from "../../Helpers/Constants";

//Components
import Management from "../Management";
import CreateRole from './CreateRole';

const { checkEmptyAndUndefined, getDataFromForm } = ValidationRules();
const { postDataTo, getDataFrom } = DataRequester();

function cleanRoleData(roleList) {

  return roleList.map((role) => {
    return {
      id: role.id,
      role: role.roleName,
      accessLevel: role.accessLevel,
      createdBy: role.createdBy.fullName,
      createdDate: role.createdDate.stringDate,
    };
  });
}

function getRoles(setFetched) {
  getDataFrom("/role")
    .then((response) => {
      const ROLELIST = cleanRoleData(response.data.result);

      console.log("ROLELIST BEFORE CLEAN: ", response.data.result);
      console.log("ROLELIST IS : ", ROLELIST);

      setFetched({
        ROLELIST: ROLELIST,
        IS_FETCHED: true,
      });
    })
    .catch((error) => {
      console.log("Error getting data : ", error.response.data);
    });
}

export default function ManageRole() {

  const [success, setSuccess] = useState({
    display: "none",
    message: "",
    data: "",
  });

  const [role, setRole] = useState({
    ROLELIST: [],
    IS_FETCHED: false,
  });

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    EventType: "",
    errorDisplay: "none",
    errorMessage: "",
  });

  const [loading, setLoading] = useState(false);

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

  //Check if roles are fetched from server if not fetch them
  role.IS_FETCHED
    ? console.log("Role Already fetched")
    : getRoles(setRole);

  const onCreateRoleButtonClick = () => {
    updateDialogState({ isOpen: true, title: CONSTANTS.CREATE_ROLE_TITLE });
  };

  const onSettingIconClick = (id) => {
    console.log("The id is : ", id);
    updateDialogState({ isOpen: true, title: CONSTANTS.CREATE_ROLE_TITLE });
  };

  const createRole = (roleData) => {

    const newRole = {
      roleName: roleData.role,
      accessLevel: roleData.accessLevel,
    };

    if (checkEmptyAndUndefined(roleData.role)) {
      updateDialogState({ errorDisplay: "show", errorMessage: "Role Name Can Not Be Empty!" });
      return;
    }

    if (checkEmptyAndUndefined(roleData.accessLevel)) {
      updateDialogState({ errorDisplay: "show", errorMessage: "Access Level Can Not Be Empty!" });
      return;
    }

    setLoading(true);
    updateDialogState({ errorDisplay: "none" });

    postDataTo("/role", newRole)
      .then((response) => {
        setLoading(false);
        updateDialogState({isOpen: false});
        console.log("Respose from role creation : ", response);
        updateSuccessAlertState({
          display: "show",
          message: "Role Created Successfuly",
          data: response.data.result.roleName,
        });
        setRole((previousState) => {
          return {
            ...previousState,
            IS_FETCHED: false,
          };
        });
      })
      .catch(function (err) {
        setLoading(false);
        console.log(err.response);
        updateDialogState({
          errorDisplay: "show",
          errorMessage: err.response,
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

    const roleData = getDataFromForm(event.target);

    EventType === CONSTANTS.CREATE_ROLE
      ? createRole(roleData)
      : console.log("The Type of event is from default : ", EventType);
  };

  return (
    <Management
      handleCreateButtonClick={onCreateRoleButtonClick}
      handleSettingIconClick={onSettingIconClick}
      handleDialogClose={onCloseDialog}
      handleSuccessAlertClose={onCloseSuccessResult}
      handleSubmit={onSubmit}
      Content={CreateRole}
      TABLE_HEAD={CONSTANTS.ROLES_TABLE_HEAD}
      pageName={CONSTANTS.ROLE_PAGE_NAME}
      fetchedData={role.ROLELIST}
      dialog={dialog}
      loading={loading}
      success={success}
    />
  );
}