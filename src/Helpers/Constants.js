import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import bug from '@iconify/icons-ant-design/bug-filled';
import accountBook from '@iconify/icons-ant-design/account-book-filled';
import audio from '@iconify/icons-ant-design/audio-filled';
import book from '@iconify/icons-ant-design/book-filled';
import experiment from '@iconify/icons-ant-design/experiment-filled';

const CONSTANTS = {

    //COMPANY_NAME
    COMPANY_NAME: "Hurricane Support IT P.L.C",

    //USER
    USER_PAGE_TITLE: "User",
    RESET_USER_PASSWORD: "RESET_USER_PASSWORD",
    RESET_USER_PASSWORD_TITLE: "RESET PASSWORD",
    CREATE_USER: "CREATE_USER",
    USER_SETTING_TITLE: "USER SETTINGS",
    CREATE_USER_TITLE: "CREATE USER",
    DEACTIVATE_USER: "DEACTIVATE_USER",
    DEACTIVATE_USER_TITLE: "DEACTIVATE USER",
    UPDATE_USER: "UPDATE_USER",
    UPDATE_USER_TITLE: "UPDATE USER",

    //TEAM
    TEAM_PAGE_NAME: "Team",
    CREATE_TEAM: "CREATE_TEAM",
    CREATE_TEAM_TITLE: "CREATE TEAM",
    TEAM_SETTING: "TEAM_SETTING",
    TEAM_SETTING_TITLE: "TEAM SETTINGS",
    // TEAM_ROW: { team, createdBy, createdDate },

    //ROLE
    ROLE_PAGE_NAME: "Role",
    CREATE_ROLE: "CREATE_ROLE",
    CREATE_ROLE_TITLE: "CREATE ROLE",

    //MISC
    API_URL: "http://localhost:3001/api/",
    TOKEN_NAME: 'token',
    LOGGED_IN_USERDATA: "signedIn_user_data",

    //SIDE_NAVBAR_ITEMS
    SIDE_NAVBAR_ITEMS: [
        "DASHBOARD", 
        "VEHICLES", 
        "USERS", 
        "TEAMS", 
        "ROLES", 
        "REPORT"
    ],

    //ROUTES
    ROUTE: {
        ROOT: "/", 
        HOME: "/home", 
        DASHBOARD: "/home/dashboard", 
        USERS: "/home/users", 
        ROLES: "/home/roles", 
        TEAMS: "/home/teams",
        VEHICLES: "/home/vehicles",
        REPORTS: "/home/reports",
    },

    ACCOUNT_MENU_OPTIONS: [
        {
          label: 'Home',
          icon: homeFill,
          linkTo:"/home"
        },
        {
          label: 'Profile',
          icon: personFill,
          linkTo: '#'
        },
        {
          label: 'Settings',
          icon: settings2Fill,
          linkTo: '#'
        }
      ],

      TEAMS_TABLE_HEAD: [
        { id: 'team', label: 'Team Name', align: "left" },
        { id: 'createdBy', label: 'Created By', align: "left" },
        { id: 'createdDate', label: 'Date Created', align: "center" },
        { id: 'setting', label: 'Settings', align: "right" },
      ],
            
      ROLES_TABLE_HEAD: [
        { id: "role", label: "Role Name", align: "left" },
        { id: "accessLevel", label: "Access Level", align: "left" },
        { id: "createdBy", label: "Created By", align: "left" },
        { id: "createdDate", label: "Date Created", align: "center" },
        { id: "setting", label: "Settings", align: "right" },
      ],

      USERS_TABLE_HEAD: [
        { id: 'fullName', label: 'Full Name', align: "left" },
        { id: 'userName', label: 'User Name', align: "left" },
        { id: 'role', label: 'Role', align: "left" },
        { id: 'team', label: 'Team', align: "left" },
        { id: 'createdBy', label: 'Created By', align: "left" },
        { id: 'status', label: 'Status', align: "left" },
        { id: 'setting', label: 'Settings', align: "right" },
      ],

      DASHBOARD_CARD_DATA: [
        {id: "total", lable: "Total", amount: 256, icon: homeFill },
        {id: "piri", lable: "Paid - Installed - Reciept Issued", amount: 15, icon: personFill },
        {id: "pinr", lable: "Paid - Installed - No Reciept", amount: 12, icon: settings2Fill },
        {id: "pniri", lable: "Paid - Not Installed - Reciept Issued", amount: 3, icon: bug },
        {id: "pninr", lable: "Paid - Not Installed - No Reciept", amount: 8, icon: accountBook },
        {id: "npinr", lable: "Not Paid - Installed - No Reciept", amount: 18, icon: audio },
        {id: "npir", lable: "Not Paid - Installed - Reciept", amount: 9, icon: book },
        {id: "npnir", lable: "Not Paid - Not Installed - Reciept", amount: 21, icon: experiment },
      ]
}

export default CONSTANTS