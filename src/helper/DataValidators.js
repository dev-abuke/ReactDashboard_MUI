export default function ValidationRules() {

    const checkEmpty = (field) => {
        if (field === "") return true;
        return false;
    };

    const checkEmptyAndUndefined = (field) => {
        if (field == "" || field == undefined) return true;
        return false;
    };

    const isNumber = (field) => {
        return Number.isInteger(field);
    };

    const checkFieldMatch = (field1, field2) => {
        return (field1 === field2)
    };
    //check if item is an array and if it is then check its length
    const isArray = (field) => {
        const result = Array.isArray(field);
        if (!result) return false;
        return true;
    };

    const checkUndefined = (field) => {
        if (field == undefined) {
            return true;
        }

        return false;
    };

    const getDataFromForm = (target) => {

        const data = new FormData(target);

        const username = data.get("username");
        const fullname = data.get("fullname");
        const password = data.get("password");
        const confirmPass = data.get("confirm");
        const role = data.get("role");
        const accessLevel = data.get("accessLevel");
        const team = data.get("team");

        return {
            fullName: fullname,
            userName: username,
            password: password,
            confirmPass: confirmPass,
            accessLevel: accessLevel, 
            role: role,
            team: team,
        }
    };

    return {
        checkEmpty,
        checkUndefined,
        getDataFromForm,
        isArray,
        checkEmptyAndUndefined,
        checkFieldMatch,
        isNumber,
    };
}