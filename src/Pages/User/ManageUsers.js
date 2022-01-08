import { useState } from 'react';

import ValidationRules from '../../Helpers/DataValidators'
import DataRequester from '../../Helpers/DataRequester'
import CONSTANTS from '../../Helpers/Constants';

import Management from '../Management';
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import ResetUser from "./ResetUser";
//Components
import UserMenuOptions from './UserMenuOptions'

const {
  checkEmptyAndUndefined, 
  checkFieldMatch, 
  getDataFromForm, 
  cleanUserData, 
  cleanRoleData, 
  cleanTeamData 

} = ValidationRules()

const { 
  postDataTo, 
  getDataFrom 

} = DataRequester()



export default function User() {

  const [success, setSuccess] = useState({
    display: "none",
    message: "",
    data: ","
  });

  const [menu] = useState({
    options: CONSTANTS.USER_MENU_OPTIONS,
    ui: UserMenuOptions,
  });

  const [fetchedData, setFetched] = useState({
    userList: [], 
    isFetched: false
  });

  const [dialog, setDialog] = useState({ 
    isOpen: false,
    Content: CreateUser,
    title: "",
    teamList: [],
    roleList: [],
    errorDisplay: "none",
    errorMessage: "",
    selectedUser: {},
    loading: false,
  });

  const updateDialogState = (newState) => {

    setDialog(previousState => {

      return {
        ...previousState,
          ...newState,
      };
    });
  };

  const updateFetchedDataState = (newState) => {

    setFetched(previousState => {

      return {
        ...previousState,
          ...newState,
      };
    });
  };

  const updateSuccessState = (newState) => {

    setSuccess(previousState => {

      return {
        ...previousState,
          ...newState,
      };
    });
  };

  function getAllData(){
    
    Promise.all([getDataFrom("/user"), getDataFrom("/role"), getDataFrom("/team")]).then(response => {

      const USERLIST = cleanUserData(response[0].data.result)
      const ROLELIST = cleanRoleData(response[1].data.result)
      const TEAMLIST = cleanTeamData(response[2].data.result)

      updateFetchedDataState({
        userList: USERLIST,
        isFetched: true,
      });

      updateDialogState({
        roleList: ROLELIST,
        teamList: TEAMLIST, 
      })

    }).catch(error => {
      console.log("Error getting data : ", error.response)
    })
  }
  

  fetchedData.isFetched ? console.log("Already fetched") : getAllData()

  
  console.log("The Updated After is: ", dialog)

  const onCreateUserButtonClick = () => {

    updateDialogState({
      isOpen: true,
      title: CONSTANTS.CREATE_USER_TITLE,
      Content: CreateUser,
    });
  };

  const onMenuClick = (setMenuOpen, selectedUser, eventType) => {

    setMenuOpen(false)
    
    switch(eventType){
      case CONSTANTS.DEACTIVATE_USER_MENU_CLICK:
        console.log("DEACTIVATE_USER_MENU_CLICK :", selectedUser)
        deactivateUser(selectedUser) 
        break;
      case CONSTANTS.EDIT_USER_MENU_CLICK: 
        console.log("EDIT_USER_MENU_CLICK :", selectedUser)
        updateDialogState({
          isOpen: true,
          title: "EDIT USER",
          Content: EditUser,
          selectedUser: selectedUser,
        });
        break;
      case CONSTANTS.RESET_PASSWORD_MENU_CLICK: 
        console.log("RESET_PASSWORD_MENU_CLICK :", selectedUser) 
        updateDialogState({
          isOpen: true,
          title: "RESET PASSWORD",
          Content: ResetUser,
          selectedUser: selectedUser,
        });
        break;
      default:
        console.log("DEFAULT MANAGE USERS")
    }
  }

  const onCloseDialog = () => {
    updateDialogState({ isOpen: false, errorDisplay: "none" });
  };
  
  const onCloseSuccessResult = () => {
    updateSuccessState({ display: "none" });
  };

  const createUser = (userData) => {

    const { fullName, userName, password, confirmPass } = userData

    if (checkEmptyAndUndefined(fullName)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "Fullname Can Not Be Empty!" })
      return
    }

    if (checkEmptyAndUndefined(userName)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "Username Can Not Be Empty!" })
      return
    }
    if (checkEmptyAndUndefined(password)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "You Must Provide Password" })
      return
    }
    if (checkEmptyAndUndefined(confirmPass)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "You Must Confirm Password" })
      return
    }
    if (!checkFieldMatch(password, confirmPass)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "Passwords Don't Match" })
      return
    }

    updateDialogState({
      errorDisplay: "none",
      loading: true 
    });

    postDataTo('/user', userData).then(response => {

      updateDialogState({loading: false,isOpen: false,});
      updateFetchedDataState({isFetched: false});
      updateSuccessState({
        display: "show",
        message: "User Created Successfuly",
        data: response.data.result.fullName,
      });

    }).catch(function (err) {

      updateDialogState({
        errorDisplay: "show",
        errorMessage: err.response.data.error,
        loading: false,
      });
    })
  }


  const resetUserPassword = (userData) => {

    const { password, confirmPass } = userData

    if (checkEmptyAndUndefined(password)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "You Must Provide Password" })
      return
    }
    if (checkEmptyAndUndefined(confirmPass)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "You Must Confirm Password" })
      return
    }
    if (!checkFieldMatch(password, confirmPass)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "Passwords Don't Match" })
      return
    }

    updateDialogState({ 
        errorDisplay: "none", 
      loading: true 
    });

    postDataTo(`/user/${dialog.selectedUser.id}/reset`, userData).then(response => {

      updateDialogState({loading: false,isOpen: false,});
      updateFetchedDataState({isFetched: false});
      updateSuccessState({
        display: "show",
        message: "Password Reset Successful",
        data: response.data.result.fullName,
      });
      console.log(response)
    }).catch(err => {

      updateDialogState({
        errorDisplay: "show",
        errorMessage: err.response.data.error,
        loading: false,
      });
    })
  }

  const deactivateUser = (selectedUser) => {

    //setLoading(true)
    const id =
      selectedUser === null || selectedUser === undefined
        ? dialog.selectedUser.id
        : selectedUser.id; 

    postDataTo(`/user/${id}/deactivate`).then(response => {

      const message = response.data.result.isActive
        ? "User Activated Successfuly"
        : "User Deactivated Successfuly";

      updateDialogState({ loading: false, isOpen: false });
      updateFetchedDataState({ isFetched: false });
      updateSuccessState({
        display: "show",
        message: message,
        data: response.data.result.fullName,
      });
      console.log("The Response ",response);
    }).catch(err => {

      console.log(err.response)
      updateDialogState({
        errorDisplay: "show",
        errorMessage: err.response.data.error,
        loading: false,
      });
    })

  }

  const updateUser = (userData) => {

    const { fullName, role, team } = userData

    if (checkEmptyAndUndefined(fullName)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "You Must Provide Fullname!" })
      return
    }

    if (checkEmptyAndUndefined(role)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "You Must Provide Role!" })
      return
    }

    if (checkEmptyAndUndefined(team)) {

      updateDialogState({ errorDisplay: "show", errorMessage: "You Must Provide Team!" })
      return
    }

    postDataTo(`/user/${dialog.selectedUser.id}/edit`, userData)
      .then(response => {

      updateDialogState({loading: false,isOpen: false,});
      updateFetchedDataState({isFetched: false});
      updateSuccessState({
        display: "show",
        message: "User Edited Successfuly",
        data: response.data.result.fullName,
      });

    }).catch(err => { 
      updateDialogState({
        errorDisplay: "show",
        errorMessage: err.response.data.error,
        loading: false,
      });
    })

  }

  const onSubmit = (event, EventType) => {

    event.preventDefault();
    
    const userData = getDataFromForm(event.target)
    
    console.log("The Whole User Data : ", userData)

    switch (EventType) {

      case CONSTANTS.CREATE_USER:
        createUser(userData)
        break;
      
      case CONSTANTS.RESET_USER_PASSWORD:
        resetUserPassword(userData)
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
  }
  return (
    <Management
      handleCreateButtonClick={onCreateUserButtonClick}
      handleMenuClick={onMenuClick}
      handleDialogClose={onCloseDialog}
      handleSuccessAlertClose={onCloseSuccessResult}
      handleSubmit={onSubmit}
      TABLE_HEAD={CONSTANTS.USERS_TABLE_HEAD}
      pageName={CONSTANTS.USER_PAGE_TITLE}
      fetchedData={fetchedData.userList}
      menu={menu}
      dialog={dialog}
      success={success}
    />
  );
}